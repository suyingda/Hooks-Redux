const ContentEdit = {
    name: 'ContentEdit',
    state: {
        initialValue: {}
    },
    actions: {
        cardActions: (params, getState) => ContentEdit.reducer.headerActions(getState, {
            type: 'init',
            data: params
        })
    },
    reducer: {
        headerActions: (state, actions) => {
            const { type, data } = actions || {};
            switch (type) {
                case 'init':
                    return {
                        ...state,
                        ...data
                    };
                case 'marry':
                    return 'czz';
                case 'son':
                    return 'sxy';
                default:
                    return 'family';
            }
        }
    }
};
export default ContentEdit;
