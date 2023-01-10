const Rank = ({user}) => {
    return (
        <div>
            <div className="white f3 center">
                {`Hi ${user.name}! Your face detection count is ${user.entries}`}
            </div>
        </div>
    );
}

export default Rank;