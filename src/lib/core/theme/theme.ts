import { Provider } from "@angular/compiler/src/core";

export abstract class CoreThemeBuilder {
    abstract getTheme(): CoreTheme;
}

export abstract class CoreTheme {
    hd: number = 1; // 基本单位
    brandPrimary: string = '#108ee9';
    // 色彩
    // ---
    // 文字色
    colorTextBase: string = '#000';                  // 基本
    colorTextBaseInverse: string = '#fff';          // 基本 - 反色
    colorTextSecondary: string = '#a4a9b0';          // 辅助色
    colorTextPlaceholder: string = '#bbb';           // 文本框提示
    colorTextDisabled: string = '#bbb';              // 失效
    colorTextCaption: string = '#888';               // 辅助描述
    colorTextParagraph: string = '#333';             // 段落
    colorLink: string = this.brandPrimary;             // 链接

    // 背景色
    fillBase: string = '#fff';                           // 组件默认背景
    fillBody: string = '#f5f5f9';                        // 页面背景
    fillTap: string = '#ddd';                            // 组件默认背景 - 按下
    fillDisabled: string = '#ddd';                       // 通用失效背景
    fillMask: string = 'rgba(0, 0, 0, 0.4)';              // 遮罩背景
    colorIconBase: string = '#ccc';                      // 许多小图标的背景，比如一些小圆点，加减号
    fillGrey: string = '#f7f7f7';

    // 透明度
    opacityDisabled: number = 0.3;   // switch checkbox radio 等组件禁用的透明度

    // 全局/品牌色
    brandPrimaryTap: string = '#0e80d2';
    brandSuccess: string = ' #6abf47';
    brandWarning: string = ' #ffc600';
    brandError: string = '#f4333c';
    brandImportant: string = ' #ff5b05';  // 用于小红点
    brandWait: string = ' #108ee9';

    // 边框色
    borderColorBase: string = '#ddd';

    // 字体尺寸
    // ---
    fontSizeIcontext: number = 10 * this.hd;
    fontSizeCaptionSm: number = 12 * this.hd;
    fontSizeBase: number = 14 * this.hd;
    fontSizeSubhead: number = 15 * this.hd;
    fontSizeCaption: number = 16 * this.hd;
    fontSizeHeading: number = 17 * this.hd;

    // 圆角
    // ---
    radiusXs: number = 2 * this.hd;
    radiusSm: number = 3 * this.hd;
    radiusMd: number = 5 * this.hd;
    radiusLg: number = 7 * this.hd;
    radiusCircle: string = '50%';

    // 边框尺寸
    // ---
    borderWidthSm: number = 1 * this.hd;
    borderWidthMd: number = 1 * this.hd;
    borderWidthLg: number = 2 * this.hd;

    // 间距
    // ---
    // 水平间距
    hSpacingSm: number = 5 * this.hd;
    hSpacingMd: number = 8 * this.hd;
    hSpacingLg: number = 15 * this.hd;

    // 垂直间距
    vSpacingXs: number = 3 * this.hd;
    vSpacingSm: number = 6 * this.hd;
    vSpacingMd: number = 9 * this.hd;
    vSpacingLg: number = 15 * this.hd;
    vSpacingXl: number = 21 * this.hd;

    // 高度
    // ---
    lineHeightBase: number = 1;           // 单行行高
    lineHeightParagraph: number = 1.5;    // 多行行高

    // 图标尺寸
    // ---
    iconSizeXxs: number = 15 * this.hd;
    iconSizeXs: number = 18 * this.hd;
    iconSizeSm: number = 21 * this.hd;
    iconSizeMd: number = 22 * this.hd;       // 导航条上的图标、grid的图标大小
    iconSizeLg: number = 36 * this.hd;

    // 动画缓动
    // ---
    easeInOutQuint: string = 'cubic-bezier(.86, 0, .07, 1)';

    // 组件变量
    // ---

    actionsheetItemHeight: number = 50 * this.hd;
    actionsheetItemFontSize: number = 18 * this.hd;

    // button
    buttonHeight: number = 47 * this.hd;
    buttonFontSize: number = 18 * this.hd;

    buttonHeightSm: number = 30 * this.hd;
    buttonFontSizeSm: number = 13 * this.hd;

    primaryButtonFill: string = this.brandPrimary;
    primaryButtonFillTap: string = this.brandPrimaryTap;

    ghostButtonColor: string = this.brandPrimary;    // 同时应用于背景、文字颜色、边框色
    ghostButtonFillTap: string = 'fade(brandPrimary, 60%)';

    warningButtonFill: string = '#e94f4f';
    warningButtonFillTap: string = '#d24747';

    linkButtonFillTap: string = '#ddd';
    linkButtonFontSize: number = 16 * this.hd;

    // menu
    menuMultiSelectBtnsHeight: number = this.buttonHeight;

    // modal
    modalFontSizeHeading: number = 18 * this.hd;
    modalButtonFontSize: number = 18 * this.hd; // 按钮字号
    modalButtonHeight: number = 50 * this.hd; // 按钮高度

    // list
    listTitleHeight: number = 30 * this.hd;
    listItemHeightSm: number = 35 * this.hd;
    listItemHeight: number = 44 * this.hd;

    // input
    inputLabelWidth: number = 17 * this.hd;       // InputItem、TextareaItem 文字长度基础值
    inputFontSize: number = 17 * this.hd;
    inputColorIcon: string = '#ccc'; // input clear icon 的背景色
    inputColorIconTap: string = this.brandPrimary;

    // tabs
    tabsColor: string = this.brandPrimary;
    tabsHeight: number = 43.5 * this.hd;
    tabsFontSizeHeading: number = 15 * this.hd;
    tabsInkBarHeight: number = this.borderWidthLg;

    // segmentedControl
    segmentedControlColor: string = this.brandPrimary;  // 同时应用于背景、文字颜色、边框色
    segmentedControlHeight: number = 27 * this.hd;
    segmentedControlFillTap: 'fade(brandPrimary, 0.1)';

    // tabBar
    tabBarFill: string = '#ebeeef';
    tabBarHeight: number = 50 * this.hd;

    // toast
    toastFill: string = 'rgba(58, 58, 58, 0.9)'; // toast, activityIndicator 的背景颜色

    // searchBar
    searchBarFill: string = '#efeff4';
    searchBarHeight: number = 44 * this.hd;
    searchBarInputHeight: number = 28 * this.hd;
    searchBarFontSize: number = 15 * this.hd;
    searchColorIcon: string = '#bbb'; // input search icon 的背景色

    // noticeBar
    noticeBarFill: string = '#fefcec';
    noticeBarHeight: number = 36 * this.hd;
    noticeBarColor: string = '#f76a24';

    // switch
    switchFill: string = '#4dd865';
    switchFillAndroid: string = this.brandPrimary;

    // tag
    tagHeight: number = 25 * this.hd;
    tagHeightSm: number = 15 * this.hd;
    tagColor: string = this.brandPrimary;

    // keyboard
    keyboardConfirmColor: string = this.brandPrimary;
    keyboardConfirmTapColor: string = this.brandPrimaryTap;

    // picker
    optionHeight: number = 42 * this.hd;           // picker 标题的高度

    // zIndex
    progressZindex: number = 2000;
    popoverZindex: number = 1999;
    toastZindex: number = 1999;
    actionSheetZindex: number = 1000; // actonsheet 会放到 popup / modal 中
    pickerZindex: number = 1000;
    popupZindex: number = 999;
    modalZindex: number = 999; // modal.alert 应该最大，其他应该较小
    tabsPaginationZindex: number = 999;
}

export class CoreThemeDefault extends CoreTheme {}

export const coreThemeProvider: Provider = {
    provide: CoreTheme,
    useClass: CoreThemeDefault
};
