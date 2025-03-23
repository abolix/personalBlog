<template>
    <div class="flex flex-col min-h-screen">
        <div class="h-14 bg-white dark:bg-zinc-900 w-full"/>
        <AppHeader/>
        <div class="flex-grow container mx-auto pt-10 px-4">
            <slot/>
        </div>
        <AppFooter/>
    </div>
</template>