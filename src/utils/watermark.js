const watermark = {};

/**
 * @param {要设置的水印内容} str
 * @param {要设置水印的容器} container
 */
const setWaterMark = (str, container) => {
  const id = "1.2321";
  if (container === undefined) {
    return;
  }

  // 查看页面上有没有，如果有则删除
  if (document.getElementById(id) !== null) {
    const childelement = document.getElementById(id);
    childelement?.parentNode?.removeChild(childelement);
  }

  const containerWidth = container.offsetWidth; // 获取父容器宽
  const containerHeight = container.offsetHeight; // 获取父容器高
  container.style.position = "relative"; // 设置布局为相对布局

  // 创建canvas元素（制作一块背景图）
  const can = document.createElement("canvas");
  can.width = 400;
  can.height = 200;
  const cans = can.getContext("2d"); // 获取canvas画布
  cans.rotate((-20 * Math.PI) / 180); // 逆时针旋转
  cans.font = "12px Vedana"; // 设置字体
  cans.fillStyle = "rgba(200,200,200,0.3)"; // 设置字体颜色
  cans.textAlign = "left"; // 文本对齐方式
  cans.textBaseline = "Middle"; // 文本基线
  cans.fillText(str, 0, (4 * can.height) / 5); // 绘制文字

  // 创建一个div元素
  const div = document.createElement("div");
  div.id = id; // 设置id
  div.style.pointerEvents = "none"; // 取消所有事件
  div.style.top = "0px";
  div.style.left = "0px";
  div.style.position = "absolute";
  div.style.zIndex = "1000";
  div.style.width = "100%";
  div.style.height = "100%";
  div.style.background =
    "url(" + can.toDataURL("image/png") + ") left top repeat";
  container.appendChild(div); // 追加到页面

  return id;
};

// 方法只允许调用一次
watermark.set = (str, container) => {
  let id = setWaterMark(str, container);
  setInterval(() => {
    if (document.getElementById(id) === null) {
      id = setWaterMark(str, container);
    }
  }, 500);

  // 监听页面大小的变化
  window.onresize = () => {
    setWaterMark(str, container);
  };
};

export default watermark;
