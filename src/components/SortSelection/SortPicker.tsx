import * as React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {databaseRef} from "../../firebase";
import {SortType, listenForSortTypes, StatementString, getSortType} from "../../types/SortType";
import {getSort, listenForSortsByType, Sort, sortName} from "../../types/Sort";
import {useEffect} from "react";
import {ISortSelectionContext, SortSelectionContext} from "../SortSelectionContext";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            width: '30%',
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

export default function SortPicker(props: {}) {
    const sortSelectionContext = React.useContext<ISortSelectionContext>(SortSelectionContext);

    const classes = useStyles();

    const inputLabel = React.useRef<HTMLLabelElement>(null);
    const [labelWidth, setLabelWidth] = React.useState(0);

    // Dropdown options
    const [sortTypes, setSortTypes] = React.useState<SortType[]>([]);
    const [sorts, setSorts] = React.useState<Sort[]>([]);

    // Selected items
    const sortTypeId = sortSelectionContext.sortType != null ? sortSelectionContext.sortType.id : '';
    const primarySortId = sortSelectionContext.primarySort != null ? sortSelectionContext.primarySort.id : "new";
    const comparisonSortId = sortSelectionContext.comparisonSort != null ? sortSelectionContext.comparisonSort.id : "none";

    React.useEffect(() => {
        // setLabelWidth(inputLabel.current!.offsetWidth);
        listenForSortTypes((sortTypes: SortType[]) => setSortTypes(sortTypes));
    }, []);

    React.useEffect(() => {
        if (sortTypeId !== '')
            return listenForSortsByType(sortTypeId, setSorts)
    }, [sortTypeId]);

    const onChangedSortType = (event: React.ChangeEvent<{ value: unknown }>) => {
        const newSortTypeId = event.target.value as string;
        if(newSortTypeId === sortTypeId) {
            return;
        }
        sortSelectionContext.setPrimarySort(null);
        sortSelectionContext.setComparisonSort(null);
        if(newSortTypeId !== ''){
            getSortType(newSortTypeId, sortSelectionContext.setSortType);
        } else {
            sortSelectionContext.setSortType(null)
        }
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="sort-type-select-label">Sort Type</InputLabel>
                <Select
                    labelId="sort-type-select-label"
                    id="sort-type-select"
                    value={sortTypeId}
                    onChange={onChangedSortType}>
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {sortTypes.map((st: SortType) => <MenuItem value={st.id}>{st.name}</MenuItem>)}
                </Select>
                <FormHelperText>Select the sort type</FormHelperText>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel id="sort1-select-label">Sort Result</InputLabel>
                <Select
                    labelId="sort1-select-label"
                    id="sort1-type-select"
                    value={primarySortId}
                    onChange={event => {
                        getSort(event.target.value as string, sortSelectionContext.setPrimarySort);
                    }}>
                    <MenuItem value="new">
                        <em>New Sort</em>
                    </MenuItem>
                    {sorts.map((st: Sort) => <MenuItem value={st.id}>{st.name()}</MenuItem>)}
                </Select>
                <FormHelperText>Select the intial sort</FormHelperText>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel id="sort2-select-label">Comparison Sort</InputLabel>
                <Select
                    labelId="sort2-select-label"
                    id="sort2-type-select"
                    value={comparisonSortId}
                    onChange={event => {
                        getSort(event.target.value as string, sortSelectionContext.setComparisonSort);
                    }}>
                    <MenuItem value="none">
                        <em>None</em>
                    </MenuItem>
                    {sorts.map((st: Sort) => <MenuItem value={st.id}>{sortName(st)}</MenuItem>)}
                </Select>
                <FormHelperText>Select a sort to compare with</FormHelperText>
            </FormControl>

        </div>
    );
}
