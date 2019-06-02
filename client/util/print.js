/**
 * 字色编号：30黑，31红，32绿，33黄，34蓝，35紫，36深绿，37白色
 * 背景编号：40黑，41红，42绿，43黄，44蓝，45紫，46深绿，47白色
 * \033[背景色编号;字色编号m
 * \033[0m 关闭所有属性
 * \033[1m 设置高亮度
 * \033[4m 下划线
 * \033[5m 闪烁
 * \033[7m 反显
 * \033[8m 消隐
 * \033[nA 光标上移n行
 * \033[nB 光标下移n行
 * \033[nC 光标右移n列
 * \033[nD 光标左移n列
 * \033[y;xH 设置光标位置（y列x行）
 * \033[2J 清屏
 * \033[K 清除从光标到行尾的内容
 */
function print(obj, option = {
    codeColor: "darkBlue",
    bgColor: 'black',
}) {
    const codeColor = {
        black: "30m",
        red: "31m",
        green: "32m",
        yellow: "33m",
        blue: "34m",
        violet: "35m",
        darkBlue: "36m",
        white: "37m",
    };
    const bgColor = {
        black: "40",
        red: "41",
        green: "42",
        yellow: "44",
        blue: "44",
        violet: "45",
        darkBlue: "46",
        white: "47",
    };
    if (codeColor[option.codeColor] == null) {
        option.codeColor = codeColor.white;
    } else {
        option.codeColor = codeColor[option.codeColor];
    }
    if (bgColor[option.bgColor] == null) {
        option.bgColor = bgColor.black;
    } else {
        option.bgColor = bgColor[option.bgColor];
    }
    let pre = "\033[" + option.bgColor + ";" + option.codeColor;
    if (typeof obj !== 'string') {
        obj = JSON.stringify(obj, null, 2);
    }
    let end = "\033[0m";
    console.log(pre + obj + end);
}

module.exports = print;