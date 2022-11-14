

export default function Message(props) {
    return (
        <div class="message">
            <ul>
                <li>
                    { props.message }
                </li>
            </ul>
        </div>
    );
}