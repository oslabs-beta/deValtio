import { createContext, useState, useContext } from "react";

const TabNumberContext = createContext<number>(1);
const ChangeTabContext = createContext<any>(null);

export const useTabNumber = () => useContext(TabNumberContext);
export const useTabChange = () => useContext(ChangeTabContext);

export const TabNumberProvider = ({ children }: { children: any }) => {

    const [tabNum, setTabNum] = useState<number>(1);

    const handleTabChange = (e: React.ChangeEvent, value: number): void => {
        setTabNum(value);
        console.log(e.target);
        console.log(tabNum);
        return;
    }

    return (
        <TabNumberContext.Provider value={tabNum}>
            <ChangeTabContext.Provider value={handleTabChange}>
                {children}
            </ChangeTabContext.Provider>
        </TabNumberContext.Provider>
    );
}