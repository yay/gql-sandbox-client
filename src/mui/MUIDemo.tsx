import React, { type FC } from 'react';
import { Grid, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { type Dayjs } from 'dayjs';
import { GridDemo } from './GridDemo';
import { Chart, echarts } from '../chart/Chart';

export function MUIDemo() {
	const [date, setDate] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

	return (
		<Box
			// `sx` is a shortcut for defining custom styles that has access to the theme:
			// https://mui.com/system/getting-started/the-sx-prop/
			// https://mui.com/system/properties/
			// https://mui.com/material-ui/customization/breakpoints/
			sx={{
				height: '100%',
				overflow: 'auto',
				padding: 2,
				boxSizing: 'border-box',
				bgcolor: 'background.paper', // this token fetches theme value and is equivalent to code below
				// backgroundColor: (theme) => theme.palette.background.paper, // type-safe unlike the above
			}}
		>
			<Grid container direction={'column'} rowGap={2}>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker label="Pick a date" value={date} onChange={(newDate) => setDate(newDate)} />
				</LocalizationProvider>
				{/* <CssVarsBasic /> */}
				<GridDemo />
				<Box width={'100%'} height={400}>
					<AreaChart />
				</Box>
			</Grid>
		</Box>
	);
}

const AreaChart: FC = () => {
	return (
		<Chart
			color={['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00']}
			title={{
				text: 'Gradient Stacked Area Chart',
			}}
			tooltip={{
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					label: {
						backgroundColor: '#6a7985',
					},
				},
			}}
			legend={{
				data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5'],
			}}
			toolbox={{
				feature: {
					saveAsImage: {},
				},
			}}
			grid={{
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true,
			}}
			xAxis={[
				{
					id: 'xAxis',
					type: 'category',
					boundaryGap: false,
					data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
				},
			]}
			yAxis={[
				{
					id: 'yAxis',
					type: 'value',
				},
			]}
			series={[
				{
					id: 'Line 1',
					name: 'Line 1',
					type: 'line',
					stack: 'Total',
					smooth: true,
					lineStyle: {
						width: 0,
					},
					showSymbol: false,
					areaStyle: {
						opacity: 0.8,
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{
								offset: 0,
								color: 'rgb(128, 255, 165)',
							},
							{
								offset: 1,
								color: 'rgb(1, 191, 236)',
							},
						]),
					},
					emphasis: {
						focus: 'series',
					},
					data: [140, 232, 101, 264, 90, 340, 250],
				},
				{
					id: 'Line 2',
					name: 'Line 2',
					type: 'line',
					stack: 'Total',
					smooth: true,
					lineStyle: {
						width: 0,
					},
					showSymbol: false,
					areaStyle: {
						opacity: 0.8,
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{
								offset: 0,
								color: 'rgb(0, 221, 255)',
							},
							{
								offset: 1,
								color: 'rgb(77, 119, 255)',
							},
						]),
					},
					emphasis: {
						focus: 'series',
					},
					data: [120, 282, 111, 234, 220, 340, 310],
				},
				{
					id: 'Line 3',
					name: 'Line 3',
					type: 'line',
					stack: 'Total',
					smooth: true,
					lineStyle: {
						width: 0,
					},
					showSymbol: false,
					areaStyle: {
						opacity: 0.8,
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{
								offset: 0,
								color: 'rgb(55, 162, 255)',
							},
							{
								offset: 1,
								color: 'rgb(116, 21, 219)',
							},
						]),
					},
					emphasis: {
						focus: 'series',
					},
					data: [320, 132, 201, 334, 190, 130, 220],
				},
				{
					id: 'Line 4',
					name: 'Line 4',
					type: 'line',
					stack: 'Total',
					smooth: true,
					lineStyle: {
						width: 0,
					},
					showSymbol: false,
					areaStyle: {
						opacity: 0.8,
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{
								offset: 0,
								color: 'rgb(255, 0, 135)',
							},
							{
								offset: 1,
								color: 'rgb(135, 0, 157)',
							},
						]),
					},
					emphasis: {
						focus: 'series',
					},
					data: [220, 402, 231, 134, 190, 230, 120],
				},
				{
					id: 'Line 5',
					name: 'Line 5',
					type: 'line',
					stack: 'Total',
					smooth: true,
					lineStyle: {
						width: 0,
					},
					showSymbol: false,
					label: {
						show: true,
						position: 'top',
					},
					areaStyle: {
						opacity: 0.8,
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{
								offset: 0,
								color: 'rgb(255, 191, 0)',
							},
							{
								offset: 1,
								color: 'rgb(224, 62, 76)',
							},
						]),
					},
					emphasis: {
						focus: 'series',
					},
					data: [220, 302, 181, 234, 210, 290, 150],
				},
			]}
		/>
	);
};
