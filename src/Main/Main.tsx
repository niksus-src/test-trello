import mainStyle from './Main.scss'

const Main = () => {

    return (
        <div className={mainStyle.main_container}>
            <div className={mainStyle.main_title}>title</div>
            <div className={mainStyle.main_content}>content</div>
        </div>
    )
}

export default Main