module.exports = {
    root: true,
    env: {
        node: true,
        jquery: true
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'semi': [ 'error', 'always' ], //句尾分号
        'quotes': [ 'error', 'single' ], //单引 双引
        'indent': [ 'error', 4 ], //缩进
        'no-dupe-args': 2, // 禁止 function 定义中出现重名参数
        'no-duplicate-case': 2, // 禁止重复的 case 标签
        'no-empty': 2, // 禁止空语句块
        'no-extra-parens': 0, // 禁止不必要的括号 //(a * b) + c;//报错
        'no-extra-semi': 2, // 禁止不必要的分号
        'no-irregular-whitespace': 2, // 禁止在字符串和注释之外不规则的空白
        'space-before-blocks': [ 2, 'always' ], // 强制在块之前使用一致的空格
        'space-before-function-paren': [ 0, 'always' ], // 强制在 function的左括号之前使用一致的空格
        'space-in-parens': [ 2, 'never' ], // 强制在圆括号内使用一致的空格
        'space-infix-ops': 2, // 要求操作符周围有空格
        'space-unary-ops': [ 2, {
            'words': true,
            'nonwords': false
        } ], // 强制在一元操作符前后使用一致的空格
        'curly': 2, //强制使用一致括号风格
        'eqeqeq': 2, //强制使用===和！==
        'no-multi-spaces': 2, //禁止使用多个空格
        'array-bracket-spacing': [ 2, 'always' ], //强制数组方括号中使用一致的空格
        'block-spacing': [ 2, 'always' ], //禁止或强制在代码块中开括号前和闭括号后有空格
        'brace-style': 2, //强制使用一致花括号风格
        'comma-spacing': 2, //强制在逗号前后使用一致的空格
        'comma-style': 2, //强制使用一致的逗号风格
        'computed-property-spacing': [ 2, 'always' ], //禁止或强制在计算属性中使用空格
        'eol-last': [ 2, 'always' ], //要求或禁止文件末尾保留一行空行,作用：方便在串联和追加文件时不会打断 shell 的提示。
        'key-spacing': 2, //强制在对象字面量的键和值之间使用一致的空格
        'keyword-spacing': 2, //强制关键字周围空格的一致性
        'linebreak-style': [ 2, 'windows' ], //强制使用一致的换行符风格
        'lines-around-comment': 2, //强制注释周围有空行
        'lines-between-class-members': [ 2, 'never' ], //要求或禁止在类成员之间出现空行
        'new-parens': 2, //要求调用无参构造函数时带括号
        'no-multiple-empty-lines': 2, //不允许多个空行
        'no-trailing-spaces': 2, //禁用行尾空白
        'semi-spacing': 2, //强制分号前后有空格
        'semi-style': 2, //强制分号的位置
        'arrow-body-style': [ 2, 'always' ], //要求箭头函数体使用大括号
        'arrow-parens': [ 2, 'always' ], //要求箭头函数的参数使用圆括号
        'arrow-spacing': 2, //要求箭头函数的箭头之前或之后有空格
        'no-confusing-arrow': [ 2, {'allowParens': true} ], //禁止在可能与比较操作符相混淆的地方使用箭头函数
        'no-var': 2, //要求使用 let 或 const 而不是 var
        'prefer-const': 2, //建议使用const
        'prefer-template': 2, //建议使用模板而非字符串连接
        'template-curly-spacing': 2, //强制模板字符串中空格的使用
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
};
