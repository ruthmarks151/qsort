import {SortMetaData} from "../../types/SortMetadata";
import {useStyles} from "./SortPicker";
import React, {useRef} from "react";
import {TextField} from "@material-ui/core";
import {ISortSelectionContext, SortSelectionContext} from "../SortSelectionContext";

export function SortMetaDataSelector(props: {}) {
    const classes = useStyles();
    const sortSelectionContext = React.useContext<ISortSelectionContext>(SortSelectionContext);

    const sortedByField = useRef(null);
    const sortClassField = useRef(null);
    const noteField = useRef(null);

    const changed = () => {

        if (sortedByField.current != null && sortClassField.current != null && noteField.current != null) {

            sortSelectionContext.setSortMetaData({
                // @ts-ignore
                note: noteField.current.input.value,
                // @ts-ignore
                sortClass: sortClassField.current.input.value,
                // @ts-ignore
                sortedBy: sortedByField.current.input.value,
            })
        }
    };

    const handleChangeFor = (field: "note" | "sortClass" | "sortedBy") => (event: React.ChangeEvent<HTMLInputElement>) => {
        var newMeta = {
            ...sortSelectionContext.sortMetaData,
        } as SortMetaData;
        newMeta[field] = event.target.value;
        sortSelectionContext.setSortMetaData(newMeta);
    };

    return (
        <div>
            <TextField className={classes.formControl} id="sorted-by-field" ref={sortedByField} label="Sorted By"
                       variant="outlined" onChange={handleChangeFor("sortedBy")}
                       value={sortSelectionContext.sortMetaData.sortedBy}/>
            <TextField className={classes.formControl} id="sort-class-field" ref={sortClassField} label="Sort Class"
                       variant="outlined"
                       onChange={handleChangeFor("sortClass")} value={sortSelectionContext.sortMetaData.sortClass}/>
            <TextField className={classes.formControl} id="note-field" ref={noteField} label="Note" variant="outlined"
                       onChange={handleChangeFor("note")}
                       value={sortSelectionContext.sortMetaData.note}/>

        </div>
    );
}