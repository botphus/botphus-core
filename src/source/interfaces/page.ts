/**
 * 屏幕配置
 * @reference https://pptr.dev/#?product=Puppeteer&version=v1.7.0&show=api-pagesetviewportviewport
 */
export interface IviewPort {
    width?: number; // 屏幕宽度, default: 1920
    height?: number; // 屏幕高度, default: 1080
    deviceScaleFactor?: number; // 设备比例尺,default: 1
    isMobile?: boolean; // 是否移动设备, default: false
}
