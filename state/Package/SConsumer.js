import React, { useContext } from 'react';
import {  AppContext } from './Nice';
import SDart from '../Module';
const utilsContext = (value, mapDispatchToProps, T) => {
    // console.log(mapDispatchToProps, T);
    const getMapDispatchToProps = {};
    Object.keys(mapDispatchToProps).forEach((items) => {
        getMapDispatchToProps[items] = (params) => value.store.dispatch(mapDispatchToProps[items](value, params));
    });
    const getProps = { ...value, ...getMapDispatchToProps };
    return <T {...getProps} />;
};

export function SConsumer() {
    //compatibility
    const getAllBy = Array.prototype.slice.call(arguments);
    /**
     * #intention c cut ----- get Components props
     * mapStateToProps
     * mapDispatchToProps
     * middleware
     * function
     */

    const [MapToProps, Template] = getAllBy;
    // const name =  Template ? Template.prototype.constructor.name : null;
    // const { name = Template ? Template.name : null } = config || {};
    const { mapStateToProps, mapDispatchToProps } = MapToProps || {};
    const mapDispatchToPropsName = mapDispatchToProps || {};
    let getDarts = {};
    // SDart[name] ? SDart[name].actions : {};
    mapDispatchToPropsName && Object.keys(mapDispatchToPropsName).forEach((items) => {
        const mergeActions = SDart[items] ? SDart[items].actions : {};
        getDarts = {
            ...getDarts,
            ...mergeActions
        };
    });
    return (props, ref, updater) => <AppContext.Consumer>
        {(value) => {
            const getMapDispatchToProps = {};
            const _ACTIONS = getDarts || {};
            //TODO use Symbol()?
            const _MAPSTATETOPROPS = mapStateToProps;
            const _MAPDISPATCHTOPROPS = mapDispatchToProps || {};
            // const _CHANGEREDUCER = Object.keys(_MAPDISPATCHTOPROPS).length ? _MAPDISPATCHTOPROPS : _ACTIONS;
            const _CHANGEREDUCER = _ACTIONS;
            Object.keys(_CHANGEREDUCER).forEach((items) => {
                //Dart to F l
                getMapDispatchToProps[items] = (params) => value.store.dispatch(_CHANGEREDUCER[items](params, value));
            });
            /**
                 * for match data
                 * @type {{...props}}
                 */
            const getProps = { ...value, ...getMapDispatchToProps };
            // let CopyFl;
            // console.log(Template, ref, ref && Object.keys(ref).length, 'redux');
            // if (ref && Object.keys(ref).length) {
            const  CopyFl = Template.bind(Template, { ...props, ...getProps }, ref);
            // } else {
            //     const anonymity = (args, refss) => {
            //         console.log(args, refss, 'args', ref);
            //         return  <Template {...{ ...props, ...getProps }} />;
            //     };
            //     CopyFl = anonymity;
            // }
            return <CopyFl />;
        }}
    </AppContext.Consumer>;
}

/**
 * second  wait
 * @returns {function(): *}
 * @constructor
 */
export  function SStatic() {
    const getAllBy = Array.prototype.slice.call(arguments);
    const [MapToProps, T] = getAllBy;
    const value = {};
    const {  mapDispatchToProps } = MapToProps || {};
    return () => utilsContext(value, mapDispatchToProps, T);
}
SStatic.contextType = AppContext;

/**
 * three waits
 * @returns {function(): *}
 * @constructor
 */
export  function SUseContext() {
    const getAllBy = Array.prototype.slice.call(arguments);
    const value = useContext(AppContext);
    const [MapToProps, T] = getAllBy;
    const {  mapDispatchToProps } = MapToProps || {};
    return () => utilsContext(value, mapDispatchToProps, T);
}

