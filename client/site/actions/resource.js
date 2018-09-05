import {
    API,
    API_RESOURCE,
    RESOURCES_S,
    RESOURCES_F,
    APPLY_S,
    APPLY_F
} from "../constants/constants";

export const applySuccess = data => ({
    type: APPLY_S,
    payload: data
});

export const applyFail = err => ({
    type: APPLY_F,
    payload: err
});

export const applyResource = (id) => ({
    type: API,
    payload: {
        url: API_RESOURCE+"/apply",
        data: {
            resourceId: id
        },
        method: "POST",
        success: applySuccess,
        error: applyFail
    }
});

export const gotResources = data => ({
    type: RESOURCES_S,
    payload: data
});

export const failedResources = err => ({
    type: RESOURCES_F,
    payload: err
});

export const fetchResources = () => ({
    type: API,
    payload: {
        url: API_RESOURCE,
        success: gotResources,
        error: failedResources
    }
})
