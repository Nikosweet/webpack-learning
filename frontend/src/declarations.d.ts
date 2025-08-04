declare module '*.module.scss' {
  type IClassNames = {
    [className: string]: string
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module '*.png';
declare module '*.jpeg';
declare module '*.jpg';
