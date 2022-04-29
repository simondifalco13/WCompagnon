interface GroupsProps {
    groups: Array<string>;
}

export default function PreferedGroups(props: GroupsProps) {
    return (
        <>
            <ol>
                {props.groups.map((group, index) => (
                    <li key={group}>{group}</li>
                ))}
            </ol>
        </>
    );
}
