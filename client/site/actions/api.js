export const API_REQUEST = "API_REQUEST";
export const API_SUCCESS = "API_SUCCESS";
export const API_FAIL = "API_FAIL";

export const apiRequested = props => ({
    type: API_REQUEST,
    ...props
});

export const apiSuccess = data => ({
    type: API_SUCCESS,
    payload: {
        data
    }
});

export const apiFailed = err => ({
    type: API_FAIL,
    payload: {
        err
    }
});
