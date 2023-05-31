const path = require('path');
const fs = require('fs/promises');

const basePath = path.join(__dirname, './src/modules');

const traverseDirectory = async (targetPath, callback, data = []) => {
  const files = await fs.readdir(targetPath, {
    recursive: true,
  });
  for (const file of files) {
    const filePath = path.join(targetPath, file);
    const fileStat = await fs.stat(filePath);
    if (fileStat.isFile()) {
      const result = await callback(filePath);
      data.push(result);
    }
    if (fileStat.isDirectory()) {
      await traverseDirectory(filePath, callback, data);
    }
  }
  return data;
};

const main = async () => {
  const content = await traverseDirectory(basePath, targetPath => {
    if (
      targetPath.endsWith('.ts') &&
      !targetPath.includes('modules/index.ts')
    ) {
      const filePath =
        '.' + targetPath.slice(targetPath.indexOf('modules') + 7).slice(0, -3);
      const importPath = `import '${filePath}';`;
      return importPath;
    }
  });
  const text = content.filter(Boolean).join('\n');
  const oldContent = await fs.readFile(path.resolve('./src/modules/index.ts'), {
    encoding: 'utf-8',
  });
  if (oldContent !== text) {
    console.log('updating :  index.ts ------------------------');
    await fs.writeFile(path.resolve('./src/modules/index.ts'), text, {
      encoding: 'utf-8',
    });
  }
};

main();
