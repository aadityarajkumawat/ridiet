import { signOut } from 'firebase/auth'
import {
    collection,
    doc,
    getDocs,
    query,
    where,
    writeBatch,
} from 'firebase/firestore'
import { Text } from 'native-base'
import { v4 } from 'uuid'
import { Layout } from '../components/Layout'
import { RDButton } from '../components/RDButton'
import { auth, db } from '../configs/firebase.config'

export function Home(props: any) {
    function newDoc() {
        return doc(db, 'diseases', v4())
    }

    async function addData() {
        const batch = writeBatch(db)

        batch.set(newDoc(), {
            name: 'Blood Pressure',
            diseaseId: v4(),
            types: ['Low', 'High'],
        })
        batch.set(newDoc(), {
            name: 'Diabetes',
            diseaseId: v4(),
            types: ['Type-1', 'Type-2', 'Type-3'],
        })

        await batch.commit()
    }

    async function getData() {
        const diseases = collection(db, 'diseases')

        const res = query(
            diseases,
            where('diseaseId', '==', 'dd935855-8eb5-4ed7-b693-60d2cf2ac89c'),
        )

        const docs = await getDocs(res)

        docs.forEach((doc) => {
            console.log(doc.data())
        })
    }

    return (
        <Layout>
            <Text fontSize={30}>Home</Text>

            {/* <RDButton title='add data' onPress={() => addData()} />

            <RDButton title='get data' onPress={() => getData()} /> */}

            <RDButton
                w='100%'
                title='Logout'
                onPress={() => {
                    ;(async () => {
                        console.log('colodf')
                        await signOut(auth)
                    })()
                }}
            />
        </Layout>
    )
}
