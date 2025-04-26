import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from 'components/ui/navigation-menu'
import React from 'react'

type Props = {}

const Aside = (props: Props) => {
    return (
        <aside id='aside' className='w-1/8 bg-amber-200'>
            <div id="asideContent" className='sticky top-0 grid justify-center'>
                <h2>Навигация</h2>
                <NavigationMenu className='w-full'>
                    <NavigationMenuList>
                        <NavigationMenuItem className='relative'>
                            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                            <NavigationMenuContent className='right-0 top-0 absolute'>
                                <NavigationMenuLink >Link</NavigationMenuLink>

                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                            <NavigationMenuContent className=' top-0'>
                                <NavigationMenuLink>Link</NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                            <NavigationMenuContent className=' top-0'>
                                <NavigationMenuLink>Link</NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </aside>
    )
}

export default Aside