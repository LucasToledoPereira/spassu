import React from 'react';

/**
 * Used to find first element inside children/React.ReactNode according its type
 * @param children
 * @param type
 * @returns
 */
function findByType<T>(children: React.ReactNode, type: T): React.ReactNode {
  return React.Children.toArray(children).find(
    (child) =>
      React.isValidElement(child) &&
      (child as React.ReactElement<any>).type === type
  );
}

/**
 * Used to filter all elements inside children/React.ReactNode according its type
 * @param children
 * @param type
 * @returns
 */
function filterByType<T>(
  children: React.ReactNode,
  component: T
): React.ReactNode {
  if (React.Children.toArray(children).length === 0) return null;
  const node = React.Children.toArray(children).filter(
    (child) =>
      React.isValidElement(child) &&
      (child as React.ReactElement<any>).type === component
  );
  return React.Children.toArray(node).length === 0 ? null : node;
}

/**
//  * Used to filter all elements inside children/React.ReactNode according its type
//  * This function must be used only when the component is rendered at the client
//  * Using 'use client', take a look at https://nextjs.org/docs/app/building-your-application/rendering/client-components
//  * @param children 
//  * @param type 
//  * @returns 
//  */
function filterByTypeClient<T>(
  children: React.ReactNode,
  component: T
): React.ReactNode {
  return React.Children.toArray(children).filter(
    (child) =>
      React.isValidElement(child) &&
      (child as React.ReactElement<any>).type ===
        (component as React.ReactElement<any>).type
  );
}

/**
 * Used to filter all elements inside children/React.ReactNode according a propertie value
 * @param children
 * @param type
 * @returns
 */
function filterByProp(
  children: React.ReactNode,
  propKey: string,
  propValue: any
): React.ReactNode {
  return React.Children.toArray(children).filter(
    (child) =>
      React.isValidElement(child) &&
      (child as React.ReactElement<any>).props[propKey] === propValue
  );
}

export { findByType, filterByType, filterByProp, filterByTypeClient };
