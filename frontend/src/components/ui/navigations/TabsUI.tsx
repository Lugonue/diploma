import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../tabs'

export type TabsTriggerType = {
    key: string,
    label: string
}
export type TabsContentType = {
    key: string,
    contents: React.ReactNode
}
type Props = {
    defaultValue: string,
    classNames?: string,
    tabsTriggers: TabsTriggerType[],
    tabsContents: TabsContentType[]

}

const TabsUI = (props: Props) => {
    return (
        <Tabs defaultValue={props.defaultValue} className={cn('w-[400px]', props.classNames)}>
            <TabsList>
                {props.tabsTriggers.map((t) => <TabsTrigger key={t.key} value={t.key}>{t.label}</TabsTrigger>)}
            </TabsList>
            {props.tabsContents.map(c => <TabsContent key={c.key} value={c.key}>{c.contents}</TabsContent>)}

        </Tabs>
    )
}

export default TabsUI