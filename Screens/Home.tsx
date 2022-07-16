import { signOut } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'
import { Text } from 'native-base'
import { Layout } from '../components/Layout'
import { RDButton } from '../components/RDButton'
import { auth, db } from '../configs/firebase.config'

export function Home(props: any) {
    // const diseases = new Map<string, >

    async function addData() {
        const diseases = collection(db, 'diseases')

        const docRef = await addDoc(diseases, {
            name: 'High Blood Pressure',
            id: '34uytr8374bc4trr',
        })

        console.log(docRef.id)
    }

    return (
        <Layout>
            <Text fontSize={30}>Home</Text>

            <RDButton title='add data' onPress={() => addData()} />

            <RDButton title='Logout' onPress={() => signOut(auth)} />
        </Layout>
    )
}
