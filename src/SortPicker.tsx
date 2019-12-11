import * as React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {databaseRef} from "./firebase";
import {SortType, listenForSortTypes, StatementString} from "./types/SortType";
import {listenForSortsByType, Sort, sortName} from "./types/Sort";
import {useEffect} from "react";

const useStyles = makeStyles((theme: Theme) =>
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

export default function SortPicker(inProps: { onSortsSelected: (primarySortId: string, comparisonSortId: string) => void, onSortTypeSelected: (sortTypeId: string) => void}) {
    const props = inProps;
    const classes = useStyles();

    const inputLabel = React.useRef<HTMLLabelElement>(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    const [unsubscribe, setUnsubscribe] = React.useState<() => void>(() => (() => {}));

    // Dropdown options
    const [sortTypes, setSortTypes] = React.useState<SortType[]>([]);
    const [sorts, setSorts] = React.useState<Sort[]>([]);

    // Selected items
    const [sortType, setSortType] = React.useState<string>('');
    const [primarySort, setPrimarySort] = React.useState<string>("new");
    const [comparisonSort, setComparisonSort] = React.useState<string>("none");

    React.useEffect(() => {
        // setLabelWidth(inputLabel.current!.offsetWidth);
        listenForSortTypes((sortTypes: SortType[]) => setSortTypes(sortTypes));
    }, []);

    React.useEffect(() => {
        if (sortType !== '')
            return listenForSortsByType(sortType, setSorts)
    }, [sortType]);

    const onChangedSortType = (event: React.ChangeEvent<{ value: unknown }>) => {
        const sortTypeId = event.target.value as string;
        if(sortTypeId === sortType) {
            return;
        }
        setSortType(sortTypeId);
        setPrimarySort("new");
        setComparisonSort("none");
        props.onSortTypeSelected(sortTypeId);
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="sort-type-select-label">Sort Type</InputLabel>
                <Select
                    labelId="sort-type-select-label"
                    id="sort-type-select"
                    value={sortType}
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
                    value={primarySort}
                    onChange={event => {
                        setPrimarySort(event.target.value as string);
                        props.onSortsSelected(event.target.value as string, comparisonSort);
                    }}>
                    <MenuItem value="new">
                        <em>New Sort</em>
                    </MenuItem>
                    {sorts.map((st: Sort) => <MenuItem value={st.id}>{sortName(st)}</MenuItem>)}
                </Select>
                <FormHelperText>Select the intial sort</FormHelperText>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel id="sort2-select-label">Comparison Sort</InputLabel>
                <Select
                    labelId="sort2-select-label"
                    id="sort2-type-select"
                    value={comparisonSort}
                    onChange={event => {
                        setComparisonSort(event.target.value as string);
                        props.onSortsSelected(primarySort, event.target.value as string);
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
