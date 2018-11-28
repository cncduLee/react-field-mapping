export const getStyleAttr = (obj, attr) => {
  if(obj instanceof HTMLElement) {
    if (obj.currentStyle) {
      return obj.currentStyle[attr];
    }else {
      return document.defaultView.getComputedStyle(obj, null)[attr];
    }
  }
  return "";
};

export const pxToNum = (string) => {
  if (typeof string === 'string' && string.match(/(px)$/)) {
    const data = string.replace(/(px)$/, "");
    return Number(data);
  }
  return NaN;
};
export const getOffset = (ele) => {
  if(ele instanceof HTMLElement) {
    let element = ele;
    let top = 0;
    let left = 0;
    while (element) {
      top += element.offsetTop;
      left += element.offsetLeft;
      element = element.offsetParent;
    }
    return {
      left,
      top
    };
  }
  return NaN;
};
//根据入参relation生成含线条坐标位置的relation
const bodyDom = document.body;
const htmlDom = document.documentElement;
const baseX= pxToNum(getStyleAttr(bodyDom, "marginLeft")) + pxToNum(getStyleAttr(bodyDom, "paddingLeft")) + pxToNum(getStyleAttr(htmlDom, "marginLeft")) + pxToNum(getStyleAttr(htmlDom, "paddingLeft"));
const baseY= pxToNum(getStyleAttr(bodyDom, "marginTop")) + pxToNum(getStyleAttr(bodyDom, "paddingTop")) + pxToNum(getStyleAttr(htmlDom, "marginTop")) + pxToNum(getStyleAttr(htmlDom, "paddingTop"));
export const calCoord = (data = [], FieldMapping) => {
  return data.map(item => {
    let sourceNum = 1;
    let targetNum = 1;
    const sourceEle = FieldMapping.sourceCom.boxEle;
    const targetEle = FieldMapping.targetCom.boxEle;
    const sourceName = item.source.name;
    const targetName = item.target.name;
    FieldMapping.state.sourceData.map((n,i) => {
      if (n.name === sourceName) sourceNum = i + 1;
    });
    FieldMapping.state.targetData.map((n,i) => {
      if (n.name === targetName) targetNum = i + 1;
    });
    const sourcePoint = sourceEle.getElementsByTagName('li')[sourceNum].querySelector('.column-icon');
    const targetPoint = targetEle.getElementsByTagName('li')[targetNum].querySelector('.column-icon');
    item.source.x = getOffset(sourcePoint).left - baseX + 6;
    item.source.y = getOffset(sourcePoint).top - baseY + 6;
    item.target.x = getOffset(targetPoint).left - baseX + 6;
    item.target.y = getOffset(targetPoint).top - baseY + 6;
    return item;
  });
};
//根据线条参数得到带箭头的线条
// export const lineToArrow = (start, end, angle, arrowW, endExtend) => {
//   const x1 = start[0];
//   const y1 = start[1];
//   const x2 = end[0];
//   const y2 = end[1];
//   let angleA = Math.atan((x2 - x1)/(y2 - y1)) * 180/Math.PI;
//   let angleB = 90 - angleA;
//   let point1x = Math.sin((angleA - angle/2) * Math.PI/180) * arrowW;
//   let point1y = Math.cos((angleA - angle/2) * Math.PI/180) * arrowW;
//   let point2x = Math.cos((angleB - angle/2) * Math.PI/180) * arrowW;
//   let point2y = Math.sin((angleB - angle/2) * Math.PI/180) * arrowW;
//   let point1 = [x2 - point1x, y2 - point1y];
//   let point2 = [x2 - point2x, y2 - point2y];
//   let point3x = Math.cos(angleB * Math.PI/180) * endExtend;
//   let point3y = Math.sin(angleB * Math.PI/180) * endExtend;
//   let point3 = [x2 + point3x, y2 + point3y];
//   if (y2 < y1 && x2 > x1) {
//     angleA = Math.atan((y1 - y2)/(x2 - x1)) * 180/Math.PI;
//     angleB = 90 - angleA;
//     point1x = Math.cos((angleA - angle/2) * Math.PI/180) * arrowW;
//     point1y = Math.sin((angleA - angle/2) * Math.PI/180) * arrowW;
//     point2x = Math.sin((angleB - angle/2) * Math.PI/180) * arrowW;
//     point2y = Math.cos((angleB - angle/2) * Math.PI/180) * arrowW;
//     point1 = [x2 - point1x, y2 + point1y];
//     point2 = [x2 - point2x, y2 + point2y];
//     point3x = Math.cos(angleA * Math.PI/180) * endExtend;
//     point3y = Math.sin(angleA * Math.PI/180) * endExtend;
//     point3 = [x2 + point3x, y2 - point3y];
//   }else if (y2 < y1) {
//     angleA = Math.atan((x1 - x2)/(y1 - y2)) * 180/Math.PI;
//     angleB = 90 - angleA;
//     point1x = Math.sin((angleA - angle/2) * Math.PI/180) * arrowW;
//     point1y = Math.cos((angleA - angle/2) * Math.PI/180) * arrowW;
//     point2x = Math.cos((angleB - angle/2) * Math.PI/180) * arrowW;
//     point2y = Math.sin((angleB - angle/2) * Math.PI/180) * arrowW;
//     point1 = [x2 + point1x, y2 + point1y];
//     point2 = [x2 + point2x, y2 + point2y];
//     point3x = Math.cos(angleB * Math.PI/180) * endExtend;
//     point3y = Math.sin(angleB * Math.PI/180) * endExtend;
//     point3 = [x2 - point3x, y2 - point3y];
//   }
//   return `M${point3.join(",")} L${point1.join(",")} L${point2.join(",")}`;
// };