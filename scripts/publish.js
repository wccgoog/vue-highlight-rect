#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 开始发布 vue-highlight-rect 组件...\n');

// 检查当前分支是否是 main 或 master
try {
  const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
  if (branch !== 'main' && branch !== 'master') {
    console.error(`❌ 错误：当前分支是 ${branch}，请切换到 main 或 master 分支进行发布`);
    process.exit(1);
  }
  console.log(`✅ 当前分支: ${branch}`);
} catch (error) {
  console.error('❌ 错误：无法获取当前分支信息');
  process.exit(1);
}

// 检查是否有未提交的更改
try {
  const status = execSync('git status --porcelain', { encoding: 'utf8' });
  if (status) {
    console.error('❌ 错误：存在未提交的更改，请先提交所有更改');
    console.log(status);
    process.exit(1);
  }
  console.log('✅ 没有未提交的更改');
} catch (error) {
  console.error('❌ 错误：无法检查 git 状态');
  process.exit(1);
}

// 运行测试
console.log('\n🧪 运行测试...');
try {
  execSync('npm test', { stdio: 'inherit' });
  console.log('✅ 测试通过');
} catch (error) {
  console.error('❌ 测试失败，发布中止');
  process.exit(1);
}

// 构建项目
console.log('\n📦 构建项目...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ 构建成功');
} catch (error) {
  console.error('❌ 构建失败，发布中止');
  process.exit(1);
}

// 检查 dist 目录是否存在
const distPath = path.join(__dirname, '../dist');
if (!fs.existsSync(distPath)) {
  console.error('❌ 错误：dist 目录不存在，构建可能失败');
  process.exit(1);
}

// 检查必要的构建文件
const requiredFiles = [
  'vue-highlight-rect.esm.js',
  'vue-highlight-rect.common.js',
  'vue-highlight-rect.umd.js'
];

for (const file of requiredFiles) {
  const filePath = path.join(distPath, file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ 错误：缺少必要的构建文件 ${file}`);
    process.exit(1);
  }
}

console.log('✅ 所有必要的构建文件都已生成');

// 获取当前版本
const packageJsonPath = path.join(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const currentVersion = packageJson.version;

console.log(`\n📋 当前版本: ${currentVersion}`);

// 询问是否要发布
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('\n确认要发布到 npm 吗？(y/N) ', (answer) => {
  if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
    console.log('❌ 发布已取消');
    rl.close();
    process.exit(0);
  }

  rl.close();

  // 发布到 npm
  console.log('\n📤 发布到 npm...');
  try {
    execSync('npm publish', { stdio: 'inherit' });
    console.log(`✅ 成功发布 vue-highlight-rect@${currentVersion} 到 npm`);
  } catch (error) {
    console.error('❌ 发布失败');
    process.exit(1);
  }

  // 推送标签到 git
  console.log('\n🏷️ 创建并推送 git 标签...');
  try {
    execSync(`git tag v${currentVersion}`, { stdio: 'inherit' });
    execSync(`git push origin v${currentVersion}`, { stdio: 'inherit' });
    console.log(`✅ 标签 v${currentVersion} 已推送到远程仓库`);
  } catch (error) {
    console.error('⚠️ 警告：无法推送 git 标签');
  }

  console.log('\n🎉 发布完成！');
});