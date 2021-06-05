import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Header, Button, Dropdown, Card, Transition } from 'semantic-ui-react';
import Chart from 'chart.js/auto';
// import 'chartjs-plugin-labels';
// import 'chartjs-plugin-datalabels';
import { withFilter } from 'graphql-subscriptions';



function QuestionAnalyticsChart({index, question}) { 
    
    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);

    const chartConfig = {
        type: 'pie',
        data: {
            labels: [
                'Option 1',
                'Option 2',
                'Option 3',
                'Option 4',
              ],
              datasets: [{
                
                data: [300, 50, 100, 20], // TODO: REPLACE WTIH RESPONSE COUNT
                backgroundColor: [
                  'rgb(65, 131, 196)',
                  'rgb(1, 100, 139)',
                  'rgb(0, 67, 85)',
                  'rgb(9, 35, 39)'
                ],
                hoverOffset: 4
              }]
        },
        plugins: {
            datalabels: {
               display: true,
               color: 'white'
            }
         }
        
      };

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            const newChartInstance = new Chart(chartContainer.current, chartConfig);
            setChartInstance(newChartInstance);
        }
    }, [chartContainer]);

    return (
        
        <canvas ref={chartContainer} />
        
    );
}

export default QuestionAnalyticsChart;