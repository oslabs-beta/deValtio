export const NotValtio = () => {
    return (
        <>
            <p>
                It seems that the application you are attempting to debug is not a
                React application that uses the Valtio State Managment Library
            </p>
            <p>
                If you've used the deValtio DevTool and liked it, please visit {' '}

                <a href='https://github.com/oslabs-beta/deValtio' target='_blank'>
                    deValtio's Github Page
                </a>
                {' '}and give us a Star!
            </p>
            <p>
                To Learn More About Valtio, checkout the {' '}

                <a href='https://github.com/pmndrs/valtio/blob/main/readme.md' target='_blank'>
                    Valtio Documentation
                </a>

            </p>
            <p>
                To Learn About React, checkout the {' '}

                <a href='https://reactjs.org/' target='_blank'>
                    React Documentation
                </a>

            </p>
        </>
    );
};