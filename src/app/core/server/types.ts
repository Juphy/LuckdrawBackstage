export interface HttpResponse {
    status: number;
    result: any;
}

export interface EditCategory {
    name: string;
    id?: number;
}

export interface DelCategory {
    id: number;
}

export interface EditShop {
    id?: number;
    name: string;
}

export interface DelShop {
    id: number;
}

export interface EditSpec {
    id?: number;
    name: string;
}

export interface DelSpec {
    id: number;
}

export interface EditSpecvalue {
    spec_id: number;
    spec_value: string;
}

export interface DelSpecvalue {
    id: number;
}

export interface EditSpu {
    id?: number;
    name: string;
    images: Array<any>;
    groups: Array<number>;
    category_id: number;
    description: string;
    send_type: string;
    brand_id?: number;
    shop_id?: number;
}

export interface DelSpu {
    id: number;
}

export interface EditGroup {
    id?: number;
    name: string;
}

export interface DelGroup {
    id?: number;
}

export interface ChangeGroupshow {
    id: number;
    show: number;
}

export interface GroupList {
    show?: number;
}

export interface CategoryList {
    category_name?: string;
}

export interface SpuList {
    goods_name?: number;
    send_type?: number;
    groups?: Array<number>;
    category_id?: number;
    create_tb?: any;
    create_ta?: any;
    page?: number;
    pagesize?: number;
}

export interface SpuInfo {
    id: number;
}

export interface SpuSkus {
    id: number;
}

export interface SpuChangeStatus {
    spu_id: number;
    status: number;
}

export interface AddSpec {
    name: string;
    values: Array<string>;
}

export interface SpecList {
    spec_ids?: Array<number>;
}

export interface EditSkus {
    spu_id: number;
    skus: Array<any>
}

export interface EditCoupon {
    id?: number;
    status?: number;
    goods_category_scopes?: Array<number>;
    goods_spu_scopes?: Array<number>;
    deadline_date: any;
    preferential_price: any;
    type: number;
    minmum_consumption_price: number;
    name: string;
}

export interface ChangeCouponStatus {
    id: number;
    status: number;
}

export interface DelCoupon {
    id: number;
}

export interface CouponList {
    name?: string;
    create_start_time?: any;
    create_end_time?: any;
    page?: number;
    pagesize?: number;
}