const sidebarStateKey = 'SidebarState';

export const getSidebarState = () => JSON.parse(localStorage.getItem(sidebarStateKey) || 'true');

export const setSidebarState = (state: boolean) => localStorage.setItem(sidebarStateKey, JSON.stringify(state));

export const removeSidebarState = () => localStorage.removeItem(sidebarStateKey);
