export const tax_model = [
    { name: '一般纳税人', value: 1 },
    { name: '小规模纳税人', value: 2 }
]
export const taxModel = {};

export const ship_way = [
    { name: '华夏寄运', value: 10 },
    { name: '院线寄运', value: 20 },
    { name: '影院自行获取', value: 30 }
];
export const shipWay = {};

export class Address {
    sheng: number;
    sheng_s: string;
    shi: number;
    shi_s: string;
    xian: number;
    xian_s: string;
    zhen: number;
    zhen_s: string;
    street: string;
}