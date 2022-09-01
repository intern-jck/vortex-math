
  // // Color creators
  // hexToRGB(hex) {
  //   let arr = /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/i.exec(hex);
  //   let r = parseInt(arr[1], 16);
  //   let g = parseInt(arr[2], 16);
  //   let b = parseInt(arr[3], 16);
  //   let rgb = {
  //     'r': r,
  //     'g': g,
  //     'b': b,
  //   }
  //   return rgb;
  // }

  // getLineColor(color1, color2, min, max, val) {
  //   // get start and end colors for range
  //   let rgb1 = this.hexToRGB(color1);
  //   let rgb2 = this.hexToRGB(color2);

  //   // gradient fade
  //   let fade = this.remap(val, min, max, 0, 1);
  //   // get color ranges
  //   let r = Math.abs(rgb2.r - rgb1.r);
  //   let g = Math.abs(rgb2.g - rgb1.g);
  //   let b = Math.abs(rgb2.b - rgb1.b);
  //   // increment color by step
  //   r = this.parseInt(r * fade - rgb1.r);
  //   g = this.parseInt(g * fade - rgb1.g);
  //   b = this.parseInt(b * fade - rgb1.b);
  //   console.log(r, g, b);
  //   // console.log(rgb1.b, rgb2.b, b, fade);
  //   let rgb = "rgb(" + Math.abs(r) + ',' + Math.abs(g) + ',' + Math.abs(b) + ")";
  //   return rgb;
  // }




        // Color lines based on length
        // let lineLength = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2).toFixed(2);
        // let mappedLength = this.parseInt(remap(lineLength, 0, 2 * r, 0, n));
        // let lineColor = this.getLineColor('#0000FF', '#FF0000', 0, n, mappedLength);
        // console.log("LINE VALS: ", lineLength, mappedLength, lineColor);



