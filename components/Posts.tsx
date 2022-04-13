export interface Prop {
    title: string,
    date: string,
    text: string,
    authors: string,
    comments: string
}

interface PostArg {
    data: Prop[]
}

export const mockData: Prop[] = [
    {
        title: 'Post 1',
        date: '10 January, 2022',
        text: 'Content of post 1',
        authors: 'mock Author',
        comments: 'mock Comment 1'
    },
    {
        title: 'Post 2',
        date: '11 January, 2022',
        text: 'Content of post 2',
        authors: 'mock Author',
        comments: 'mock Comment 1'
    },
    {
        title: 'Post 3',
        date: '12 January, 2022',
        text: 'Content of post 3',
        authors: 'mock Author',
        comments: 'mock Comment 1'
    }
]

export default function Posts(props: PostArg) {
    const { data } = props
    return(
        <div className="flex flex-col gap-2">
            {
            data.map( (post: Prop) => {
                return(
                <div key={'one'} className='flex flex-col px-2 py-2 flex-wrap w-full'>
                    <div>{post.title}</div>
                    <div>{post.authors}</div>
                    <div>{post.date}</div>
                    <div>{post.text}</div>
                </div>
                    )                
                })
            }
        </div>
    )
    }