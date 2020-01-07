import * as React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {QSet, listenForQSet, getQSet} from "../../types/QSet";
import {getSort, listenForSortsByQSet, qSort} from "../../types/QSort";
import {ISortSelectionContext, SortSelectionContext} from "../SortSelectionContext";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {useStyles} from "../NavbarContainer";

export default function SortPicker(props: {}) {
    const sortSelectionContext = React.useContext<ISortSelectionContext>(SortSelectionContext);

    const classes = useStyles();


    const inputLabel = React.useRef<HTMLLabelElement>(null);
    const [labelWidth, setLabelWidth] = React.useState(0);

    // Dropdown options
    const [sortTypes, setSortTypes] = React.useState<QSet[]>([]);
    const [sorts, setSorts] = React.useState<qSort[]>([]);

    // Selected items
    const sortTypeId = sortSelectionContext.sortType != null ? sortSelectionContext.sortType.id : '';
    const primarySortId = sortSelectionContext.primarySort != null ? sortSelectionContext.primarySort.id : "new";
    const comparisonSortId = sortSelectionContext.comparisonSort != null ? sortSelectionContext.comparisonSort.id : "none";

    React.useEffect(() => {
        // setLabelWidth(inputLabel.current!.offsetWidth);
        listenForQSet((sortTypes: QSet[]) => setSortTypes(sortTypes));
    }, []);

    React.useEffect(() => {
        if (sortTypeId !== '')
            return listenForSortsByQSet(sortTypeId, setSorts)
    }, [sortTypeId]);

    const onChangedSortType = (event: React.ChangeEvent<{ value: unknown }>) => {
        const newSortTypeId = event.target.value as string;
        if(newSortTypeId === sortTypeId) {
            return;
        }
        sortSelectionContext.setPrimarySort(null);
        sortSelectionContext.setComparisonSort(null);
        if(newSortTypeId !== ''){
            getQSet(newSortTypeId, sortSelectionContext.setSortType);
        } else {
            sortSelectionContext.setSortType(null)
        }
    };
    const fillParent = {width: '100%'};
    return (
        <Paper className={classes.paper}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <FormControl style={fillParent}>
                        <InputLabel id="sort-type-select-label">Sort Type</InputLabel>
                        <Select
                            labelId="sort-type-select-label"
                            id="sort-type-select"
                            value={sortTypeId}
                            onChange={onChangedSortType}>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {sortTypes.map((st: QSet) => <MenuItem value={st.id}>{st.name}</MenuItem>)}
                        </Select>
                        <FormHelperText>Select the sort type</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl  style={fillParent}>
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
                            {sorts.map((st: qSort) => <MenuItem value={st.id}>{st.name()}</MenuItem>)}
                        </Select>
                        <FormHelperText>Select the intial sort</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl style={fillParent}>
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
                            {sorts.map((st: qSort) => <MenuItem value={st.id}>{st.name()}</MenuItem>)}
                        </Select>
                        <FormHelperText>Select a sort to compare with</FormHelperText>
                    </FormControl>
                </Grid>
            </Grid>
        </Paper>
    );
}
