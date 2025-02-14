export const GET_PRODUCT_DETAILS_BY_PRODUCT_ID = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/product/product_detail?ProductID=[ProductID]`;
export const GET_BOOK_DETAILS_BY_URL_SLUG = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/product/product_detail?URLSlug=[[URL_SLUG]]`;
export const GET_BOOK_DETAILS_BY_ID = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/product/product_detail_by_id`;
export const SIGN_IN_WITH_EMAIL_AND_PASSWORD = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/auth/signInWithEmailPassword`;
export const SIGN_UP_WITH_EMAIL_AND_PASSWORD = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/auth/createUserWithEmailAndPassword`;
export const SIGN_UP_WITH_PHONE_NUMBER = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/auth/createUserWithPhoneNumber`;
export const SIGN_IN_WITH_PHONE_NUMBER = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/auth/signInWithPhoneNumber`;
export const VERIFY_WITH_OTP = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/auth/checkPhoneOTP`;
export const GET_USER_INFO = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/private/customer/info`;
export const GET_ALL_BOOKS = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/product/home_page_product?limit=16&page=[page]&sort=[sort]`;
export const GET_ALL_SUBJECTS = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/subject/all_subjects`;
export const GET_ALL_POPULAR_BOOKS = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/product/home_page_product?page=[page]&sort=[sort]`;
export const GET_ALL_CART_ITEMS = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/private/cart/items`;
export const GET_SELECTED_DISTRICT = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/address-info/upazila_list_with_district?district_id=[districtSelected]`;
export const GET_HOME_PAGE_BOOKS = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/product/home_page_product`;
export const GET_HOME_PAGE_BANNERS = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/banner/home_page_banners`;
export const GET_ALL_AUTHORS = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/author/all_authors`;
export const GET_AUTHORS_INFO = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/author/author_detail?AuthorSlug=[AuthorSlug]`;
export const GET_POPULAR_AUTHORS = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/author/popular_authors`;
export const GET_AUTHORS_BOOKS = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/product/author?AuthorID=[AuthorID]&limit=32`;
export const GET_PRODUCT_BY_CATEGORY = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/product/category?CategoryID=[CategoryID]`;
export const GET_SIMILAR_PRODUCTS = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/product/similar_products?ProductID=[ProductID]`;
export const GET_AUTHOR_NAME_BY_AUTHOR_ID = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/author/author_detail?AuthorID=[AuthorID]`;
export const GET_DIVISION_LIST = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/address-info/division_list`;
export const GET_SELECTED_DIVISION_BY_ID = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/address-info/district_list_with_division?division_id=[divisionSelected]`;
export const PATCH_CART_DATA = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/private/cart/update_quantity`;
export const GET_FAV_DATA = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/private/favorite/get_favorite_items`;
export const POST_FAV_DATA = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/private/favorite/toggle_favorite`;
export const GET_COMMON_INFO = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/commoninfo/`;
export const INCREASE_CART_QUANTITY = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/private/cart/increase_quantity`;
export const DECREASE_CART_QUANTITY = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/private/cart/decrease_quantity`;
export const GET_PRODUCT_REVIEW_BY_ID = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/review/get_reviews/[ProductID]`;
export const POST_PRODUCT_REVIEW = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/private/review/new_review/`;
export const DELETE_CART_ITEM = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/private/cart/remove_product`;
export const UPDATE_CART_DATA = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/private/cart/update`;
export const CHECKOUT_DATA_SELECTION = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/private/cart/[mark]`;
export const GET_CHECKOUT_DATA = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/private/order/checkout_info?AddressID=[AddressID]&GiftWrap=[GiftWrap]`;
export const GET_ONLY_CHECKOUT_DATA = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/private/order/checkout_info?GiftWrap=[GiftWrap]`;
export const GET_ALL_ADDRESS = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/private/address/all_addresses`;
export const GET_ADDRESS_WITH_SHIPPING_FEE = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/product/shipping_data?division_id=[DIVISION_ID]&district_id=[DISTRICT_ID]&upazila_id=[UPAZILA_ID]`;
export const POST_NEW_ADDRESS = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/private/address/new`;
export const POST_EDIT_ADDRESS = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/private/address/edit`;
export const DELETE_ADDRESS = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/private/address/delete`;
export const GET_PRODUCTS_FILTERED = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/product/product_filter`;
export const PLACE_ORDER = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/private/order/place_order`;
export const SUBMIT_PAYMENT_TRANSACTION = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/private/order/submit_trx_id`;
export const GET_ALL_ORDERS = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/private/order/all_orders`;
export const UPDATE_PROFILE = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/private/customer/edit`;
export const GET_NAVBAR_ITEMS = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/navbar`;
export const GET_MY_REVIEWS = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/private/review/user-reviews`;
export const GET_TERMS_AND_CONDITIONS = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/commoninfo/TermsCondition`;
export const GET_PRIVACY_POLICIES = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/commoninfo/PrivacyPolicy`;
export const GET_RETURN_POLICIES = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/commoninfo/ReturnPolicy`;
export const GET_HOMEPAGE_POPULAR_PRODUCTS = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/category/popular-with-products`;
export const DELETE_REVIEW = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/private/review/delete-review`;
export const STATIONARY_PRODUCTS = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/product/product_filter?ProductType=STATIONARY`;
export const GET_SUBJECT_WITH_SUBJECT_SLUG = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/filter-info/infos?CategorySlug=[[CategorySlug]]`;
export const GET_CONTESTES = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/contests/`;
export const GET_EMAIL_VERIFICATION_OTP = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/auth/checkEmailOTP`;
export const UPDATE_PFP = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/private/customer/update_profile_picture`;
export const UPDATE_REVIEW = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/private/review/update-review`;
export const MARK_AS_SELECTED = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/private/cart/mark_all_as_selected`;
export const GET_OFFERS = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/offer/offers`;
export const GET_PUBLICATIONS = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/publication/all`;
export const GET_STATIONARIES = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/product/product_filter?ProductType=STATIONARY`;
export const GET_UNIVERSITIES = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/higher-edu/universities?page=[page]&query=[query]`;
export const GET_HOME_ACADEMICS = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/home-page-academic-book-category/`;
export const VERIFY_EMAIL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/private/auth/request-email-verification`;
export const VERIFY_PHONE = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/private/auth/request-phone-verification`;
export const VERIFY_PHONE_OTP = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/private/auth/verify-phone`;
export const VERIFY_EMAIL_OTP = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/private/auth/verify-email`;
export const RESET_PASSWORD = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/auth/reset-password`;
export const VERIFY_RESET_PASSWORD_OTP = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/auth/reset-password-otp-verify`;
export const SET_NEW_PASSWORD = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/auth/reset-password-new-password`;
export const GET_ALL_CATEGORIES = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/category/categories?limit=15&ProductType=SUBJECT_BOOK`;
export const GET_JONOPRIYO_CATEGORIES = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/jonopriyo-category/`;
export const GET_HOME_PAGE_JONOPRIYO_CATEGORIES = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/category/categories?Popular=true`;
export const GET_HOME_PAGE_SUBJECTS = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/category/categories?limit=15&ParentCategoryID=0&ProductType=SUBJECT_BOOK&Popular=true`;
export const GET_PRODUCTS_FILTERED_WITH_PRODUCT_TYPE = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/product/products-with-product-type?ProductType=[[ProductType]]&limit=32`;
export const GET_SEACHED_PRODUCTS = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/product/search`;
export const GET_PUBLICATION_DETAILS_BY_SLUG = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/publication/publication_details?PublicationSlug=[[PublicationSlug]]`;
export const GET_PRODUCT_BY_PUBLICATION_ID = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/product/product_filter?PublicationID=[[PublicationID]]&limit=32`;
export const GET_CATEGORY_BY_CATEGORY_ID = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/category/categories?CategoryID=[[CategoryID]]`;
export const GET_UNIVERSITY_DETAILS_BY_SLUG = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/higher-edu/universities/get-one?InstituteSlug=[[InstituteSlug]]`;
export const GET_POPUP = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/popup/`;
export const GET_POPULAR_SUBCATEGORY = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/subcategory/popular`;
export const GET_PUBLICATION_DETAILS_BY_ID = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/publication/publication_details`;
