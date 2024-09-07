import type * as echartsTypes from 'echarts';
import * as echarts from 'echarts';
import type * as zrenderTypes from 'zrender';

export interface ChartProps extends echartsTypes.EChartsOption {
  /**
   * Class name to set on the root element of this component. Even though charts default to the `canvas` renderer,
   * this can still be useful for certain internal HTML component styling, such as chart tooltips.
   */
  className?: string;

  /**
   * The options to use when initializing a chart instance.
   * These are the same as described in the eCharts API reference.
   *
   * If both `width` and `height` inside `initOptions` are set (useful for testing),
   * the chart will use the explicitly set size instead of auto-sizing to its container.
   *
   * Be careful using this config: if a different options object is provided (reference equality),
   * the chart will be re-instantiated.
   */
  initOptions?: ChartInitOptions;

  /**
   * Callback that's invoked every time chart's size changes due to auto-sizing to chart's container
   * or due to chart given a fixed size.
   */
  onResize?: ChartResizeCallback;

  /**
   * The `ReactNode` to render inside the overlay container on top of the chart.
   * The overlay container is always the same size as the chart itself.
   *
   * Note that the overlay container has pointer event set to `none` to allow interacting with the chart.
   * So if one is to palce an interactive element such as a button into the overlay container,
   * one has to also set that element's `pointer-events` CSS property to `auto`.
   */
  overlay?: React.ReactNode;

  /**
   * To access chart instance after it's been created (to bind events, get chart's image data, etc.)
   * use the value returned by the `useChartApiRef` hook for this prop.
   */
  ref?: React.Ref<ChartApi | undefined>;

  /**
   * The rendering backend. Defaults to `canvas`.
   */
  renderer?: 'canvas' | 'svg';

  /**
   * The second parameter to the [echartsInstance.setOption](https://echarts.apache.org/en/api.html#echartsInstance.setOption) call.
   * By default, `series`, `xAxis`, and `yAxis` components will be merged in the `replaceMerge` mode on updates,
   * therefore it's a good practice to specify `id`'s for those components, if you dont' intend for them to be replaced on updates.
   */
  setOptions?: echartsTypes.SetOptionOpts;

  /**
   * The name of a registered chart theme object. If not specified, this will match the `themeKey` from the nearest `DesignProvider`.
   * Use `ChartThemeUpdater` at the root of your component tree to update and register chart themes when design context changes.
   */
  theme?: string | object;
}

export type ChartApi = echartsTypes.ECharts;
export type ChartTheme = {
  /**
   * That's how `ThemeOption` type is defined internally in eCharts, and it's not exported, so redefining it here.
   */
  [key: string]: unknown;
};

type EChartsInitParams = Parameters<typeof echarts.init>;
export type EChartInitOptions = Exclude<EChartsInitParams[2], undefined>;
export type ChartInitOptions = EChartInitOptions & {
  width?: Exclude<EChartInitOptions['width'], string>;
  height?: Exclude<EChartInitOptions['height'], string>;
};

export type ChartResizeCallback = (params: { width: number; height: number }) => void;

export type InferArrayElementType<ArrayType> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
export type ChartGraphic = InferArrayElementType<ChartProps['graphic']>;

export type LegendSelectChangeEventParams = {
  // The `name` of the toggled series.
  name: string;
  // A map of series name to selection status (for all series).
  selected: {
    [name: string]: boolean;
  };
  type: 'legendselectchangged';
};

export { echartsTypes, zrenderTypes };
