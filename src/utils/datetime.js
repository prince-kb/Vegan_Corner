export const showDate = (da) => {
    return new Date(new Date(da).getTime()).toString().slice(0, 16);
  };

export const showTime = (da) => {
    const d = new Date(da);
    const x = d.toLocaleString();
    return x.slice(x.length - 11, x.length - 6) + " " + x.slice(x.length - 2);
  };