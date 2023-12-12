#a partir da pasta raiz
find . -name *.test.js
find . -name *.test.js -not -path '*node_modules**'
find . -name *.js -not -path '*node_modules**'

npm i -g ipt
find . -name *.js -not -path '*node_modules**' | ipt


cp -r ../../modulo1/aula05-tdd-project-pt03/ .

CONTENT="'use strict';"
find . -name "*.js" -not -path '*node_modules**' \
| ipt -o \
| xargs -I '{file}' sed -i "" -e "1s/^/$CONTENT\\n/" {file}
# 1s = primeira linha
# ^ = inicio da linha
# /g = fim da linha



CONTENT="'use strict';"
find . -name "*.js" -not -path '*node_modules**' \
| xargs -I '{file}' sed -i "" -e "1s/^/$CONTENT\\n/" {file}