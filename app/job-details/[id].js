import {Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl} from 'react-native'
import {Stack, useRouter, useSearchParams} from 'expo-router'
import { useCallback, useState } from 'react'

import {Company, JobAbout, JobFooter,JobTabs,ScreenHeaderBtn, Specific} from '../../components'
import {COLORS, icons, SIZES} from '../../constants'
import { useFetch } from '../../hooks/useFetch'

const JobDetails = () => {
    const params = useSearchParams();
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {};

    const { data, isLoading, error, refetch} = useFetch('job-details', {job_id: params.id})

    return (
     <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
        <Stack.Screen
            options={{
                headerStyle: {backgroundColor: COLORS.lightWhite },
                headerShadowVisible: false,
                headerBackVisible: false,
                headerLeft: () => (
                    <ScreenHeaderBtn 
                        iconUrl={icons.left}
                        dimension="60%"
                        handlePress={() => router.back()}
                    />
                ),
                headerRight: () => (
                    <ScreenHeaderBtn 
                        iconUrl={icons.share}
                        dimension="60%"
                    />
                ),
                headerTitle: 'Job details',
                headerTitleAlign: 'center'
            }}
        />

        <>
            <ScrollView 
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl  refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.primary}/>
                ) : error (
                    <Text>Something went wrong</Text> ) }                  
                
            </ScrollView>
        </>

     </SafeAreaView>
  )
}

export default JobDetails