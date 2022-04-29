interface Engines {
    id: string;
    name: string;
    groupId: string;
    connectible: boolean;
}

interface SelectProps {
    engines: Array<Engines>;
    handleSelectChange: (event: any) => void;
}

export default function SelectMachine(props: SelectProps) {
    return (
        <>
            <select onChange={(e) => props.handleSelectChange(e.target.value as String)}>
                <option value={"default"}>Select a machine</option>
                {props.engines.map((engine) => (
                    <option key={engine.id} value={engine.id}>
                        {engine.name}
                    </option>
                ))}
            </select>
        </>
    );
}
