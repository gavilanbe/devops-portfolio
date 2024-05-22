const fileSystem = {
  'nahuel': {
      'type': 'dir',
      'content': {
          'about': {
              'type': 'dir',
              'content': {
                  'info.txt': 'Soy un desarrollador con experiencia en DevOps y SRE. Este es mi portafolio interactivo.'
              }
          },
          'contact': {
              'type': 'dir',
              'content': {
                  'info.txt': 'Puedes contactarme en: correo@ejemplo.com'
              }
          },
          'projects': {
              'type': 'dir',
              'content': {
                  'projectA.txt': 'Descripción del Proyecto A',
                  'projectB.txt': 'Descripción del Proyecto B',
                  'projectC.txt': 'Descripción del Proyecto C'
              }
          }
      }
  }
};

let currentDir = 'nahuel';

const commands = {
  help: function() {
      return "Comandos disponibles:\n - help: Muestra esta ayuda\n - cd: Cambia de directorio. Usa `cd ..` para regresar al directorio principal\n - ls: Lista el contenido del directorio actual\n - cat: Muestra el contenido de un archivo\n - pwd: Muestra el directorio actual\n - clear: Limpia la terminal\n - tree: Muestra el árbol de directorios";
  },
  clear: function() {
      return 'clear';
  },
  ls: function() {
      const dirContent = currentDir.split('/').reduce((acc, dir) => acc[dir] ? acc[dir].content : acc, fileSystem);
      const entries = Object.keys(dirContent).map(key => {
          if (dirContent[key].type === 'dir') {
              return `<span class="directory">${key}</span>`;
          } else {
              return `<span class="file">${key}</span>`;
          }
      }).join(' ');
      return entries;
  },
  cd: function(dir) {
      if (dir === '..') {
          if (currentDir !== 'nahuel') {
              const pathArray = currentDir.split('/').filter(Boolean);
              pathArray.pop();
              currentDir = pathArray.length ? pathArray.join('/') : 'nahuel';
          }
      } else {
          const dirContent = currentDir.split('/').reduce((acc, dir) => acc[dir] ? acc[dir].content : acc, fileSystem);
          if (dirContent[dir] && dirContent[dir].type === 'dir') {
              currentDir = `${currentDir}/${dir}`.replace(/^\/+|\/+$/g, '');
          } else {
              return `<span class="error">No existe el directorio: ${dir}</span>`;
          }
      }
      return '';
  },
  cat: function(file) {
      const dirContent = currentDir.split('/').reduce((acc, dir) => acc[dir] ? acc[dir].content : acc, fileSystem);
      if (dirContent[file] && dirContent[file].type !== 'dir') {
          return dirContent[file];
      } else {
          return `<span class="error">No existe el archivo: ${file}</span>`;
      }
  },
  pwd: function() {
      return `<span class="current-dir">/${currentDir}</span>`;
  },
  tree: function(dir = 'nahuel') {
      function traverse(fs, depth = 0) {
          let treeStr = '';
          const indent = '  '.repeat(depth);

          Object.keys(fs).forEach(key => {
              treeStr += `${indent}${key}\n`;
              if (fs[key].type === 'dir') {
                  treeStr += traverse(fs[key].content, depth + 1);
              }
          });

          return treeStr;
      }

      return `<pre>${traverse(fileSystem[dir].content)}</pre>`;
  }
};
