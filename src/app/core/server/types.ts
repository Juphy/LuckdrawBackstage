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
    shop_id: number;
}

export interface DelSpu {
    id: number;
}

export interface EditGroup {
    id?: number;
    name: string;
    shop_id: number;
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
    shop_id?: number;
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
    shop_id?: number;
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
    values?: Array<string>;
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
    shop_id: number;
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

export interface AdsList {
    page?: number;
    pagesize?: number;
    name?: string;
    position_type?: string;
}

export interface EditAdPosition {
    type: number;
    name: string;
    category: number;
    status: number;
    id?: number;
}

export interface AdPositionStatus {
    id: number;
    status: number;
}

export interface AdPositionAds {
    id: number;
}

export interface EditAds {
    position_id: number;
    image: string;
    name: string;
    url_name: string;
    start_date: string;
    end_date: string;
    sort: number;
    // position_type: number;
    id?: number;
    url_type: number;
    url_path: string;
    url_id: string;
}

export interface DelAds {
    id: number;
}

export interface ChangeSort {
    id: number;
    sort: number;
}

export interface UpdateClickNum {
    id: number;
}

export interface QuestionAnswers {
    page?: number;
    pagesize?: number;
    type?: number;
}

export interface SysOptions {
    type?: string;
}

export interface EditQuestion {
    type: number;
    question: string;
    answer: string;
    id?: number;
}

export interface DelQuestion {
    id: number;
}

export interface UserInfo {
    code?: any;
    state?: any;
}

export interface RoleAdd {
    name: string;
    permissions: any;
}

export interface RoleEdit {
    id: number;
    name: string;
    permissions: any;
}

export interface RoleValid {
    id: number;
}

export interface RoleInvalid {
    id: number;
}

export interface RoleInfo {
    id: number;
}

export interface RoleBinds {
    user_id: number;
    roles: number[];
}

export interface RoleList {
    status?: number;
    page?: number;
    pagesize?: number;
}

export interface UserList {
    attention_service?: number;
    attention_applet?: number;
    nickname?: string;
    realname?: string;
    sex?: number;
    shop_id?: number;
    shop_name?: string;
    min_point?: number;
    max_point?: number;
    min_balance?: number;
    max_balance?: number;
    phone?: string;
    joined_count?: number;
    is_manager?: boolean;
    is_special?: boolean;
    start_created_at?: string;
    end_created_at?: string;
    page?: number;
    pagesize?: number;
}

export interface TemplateList {
    template_name?: string;
    template_type?: string;
    page?: number;
    pagesize?: number;
}

export interface DelTemplate {
    id: number;
}

export interface ShopList {
    type?: number;
    belong_to_user?: number;
    name?: string;
    page?: number;
    pagesize?: number;
}

export interface ShopInfo {
    id: number;
}

export interface OrderGoodsList {
    status?: number;
    page?: number;
    pagesize?: number;
}

export interface OrderActivities {
    name?: string;
    page?: number;
    pagesize?: number;
}

export interface OrderActivitiesTimes {
    nickname?: string;
    start_time?: string;
    end_time?: string;
    page?: number;
    pagesize?: number;
}

export interface FeedbackList {
    page?: number;
    pagesize?: number;
}

export interface HandleFeedback {
    id: number;
    remark?: string;
}

export interface EditDailyTasks {
    action_type: number[],
    name: string;
    times: number;
    point: number;
    balance: number;
    url?: string;
    id?: number;
}

export interface DelDailyTask {
    id: number;
}

export interface ExchangeMoneyList {

}

export interface EditExchangeMoney {
    type: number;
    point: number;
    money: number;
    total: number;
    status?: number;
    id?: number;
}

export interface ChangeExchangeMoneyStatus {
    id: number;
    status: number;
}

export interface DelExchangeMoney {
    id: number;
}

export interface ActivityManagerList {
    nickname?: string;
    phone?: string;
    belong_to?: number;
    page?: number;
    pagesize?: number;
}

export interface OnlineGalleryList {
    name?: string;
    type?: number;
    page?: number;
    pagesize?: number;
}

export interface EditOnlineGallery {
    name: string;
    img_path: string;
    types: number[];
    id?: number;
}

export interface DelOnlineGallery {
    id: number;
}

export interface ActivityTimeList {
    activity_type?: number;
    show?: any;
}

export interface ActivityEditTimes {
    activity_type: number;
    hours: number;
    handler_price: number;
    real_price: number;
    show?: any;
    id?: number;
}

export interface ActivityDelTimes {
    id: number;
}

export interface ActivityChangeTimeShow {
    id: number;
    show: any;
}

export interface EditLogistics {
    order_id: any;
    logistic_company_id: any;
    track_number: any;
}

export interface UserRoles {
    user_id: number;
}

export interface CouponInfo {
    id: number;
}