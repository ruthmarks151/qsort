import React from 'react';
import {useTheme} from '@material-ui/core/styles';
import {LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip, Legend} from 'recharts';
import Title from './Title';
import {qSort} from "../../types/QSort";
import {correlation} from "../Analysis/Analysis";


export default function CongruenceChart({sorts}: { sorts: qSort[] }) {
    const theme = useTheme();

    console.log(sorts);
    const qSets = Array.from(new Set(sorts.map(s => s.qSet.id)));

    const times = sorts
        .map(sort => sort.sortedOn.toMillis())
        .filter((millis, i, array) => (i + 1 >= array.length ||
            (new Date(array[i + 1]).toISOString().substr(0, 10)) !== (new Date(array[i]).toISOString().substr(0, 10))));
    const selfSorts = sorts.filter((s) => s.qSubjectId === "self");
    const idealSorts = sorts.filter((s) => s.qSubjectId === "ideal");

    const data = sorts.length === 0 ? [] : [
        //{time: (sorts[0].sortedOn.toMillis() - 1), ...Object.fromEntries(qSets.map(set => [set, undefined]))},
        ...times.map(time => {
            return {
                time
                , ...Object.fromEntries(qSets.map(set => {
                    const self = selfSorts.filter(s => s.qSetId === set && s.sortedOn.toMillis() <= time).slice(-1)[0];
                    const ideal = idealSorts.filter(s => s.qSetId === set && s.sortedOn.toMillis() <= time).slice(-1)[0];

                    const r = self && ideal ? correlation(self, ideal) : undefined;
                    return [set, r]
                }))
            }
        })
    ];

    return (
        <React.Fragment>
            <Title>Congruence Over Time</Title>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 30,
                        left: 48,
                    }}
                >
                    <XAxis dataKey="time"
                           stroke={theme.palette.text.secondary}
                           tickFormatter={(d) => (new Date(d).toISOString().substr(0, 10))}
                    />
                    <YAxis stroke={theme.palette.text.secondary}>
                        <Label
                            angle={0}
                            position="left"
                            style={{textAnchor: 'middle', fill: theme.palette.text.primary}}
                        >
                            Congruence
                        </Label>
                    </YAxis>
                    <Legend verticalAlign="top" height={36}/>
                    <Tooltip
                        labelFormatter={(d) => (new Date(d).toISOString().substr(0, 10))}
                    />
                    {qSets.map((setId, i) =>
                        <Line
                            type="monotone"
                            label={<p>{setId}</p>}
                            dataKey={setId}
                            dot={false}
                            stroke={
                                // @ts-ignore TODO Be less bad
                                theme.palette[["primary", "secondary", "warning"][i % 3]].main
                            }
                        />
                    )}
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}
