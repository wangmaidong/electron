let path = require('path');
let fs = require('fs');

document.addEventListener('DOMContentLoaded', () => {
  let inputPath = document.getElementById('inputPath');
  let inputContent = document.getElementById('inputContent');
  let saveBtn = document.getElementById('saveBtn');
  function saveFile() {
    console.log('inputPath-->', inputPath.value);
    console.log('inputContent-->', inputContent.value);
    let inputPathValue = inputPath.value;
    let inputContentValue = inputContent.value;
    if (!inputPathValue) {
      const desktopPath = path.join(require('os').homedir(), 'Desktop'); // 获取桌面路径
      const filePath = path.join(desktopPath, 'output.txt'); // 拼接文件路径
      fs.writeFile(filePath, inputContentValue, function (err) {
        if (err) {
          console.error('写入文件失败:', err);
        } else {
          console.log('写入文件成功');
        }
      });
    } else {
      const filePath = path.join(inputPathValue, 'output.txt'); // 拼接文件路径
      fs.writeFile(filePath, inputContentValue, function (err) {
        if (err) {
          console.error('写入文件失败:', err);
        } else {
          console.log('写入文件成功');
        }
      });
    }
  }
  saveBtn.addEventListener('click', saveFile);
});
