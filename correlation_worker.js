self.onmessage = function(event)
{
	let timeseries = event.data.timeseries;
	let test_frequencies = event.data.test_frequencies;
	let sample_rate = event.data.sample_rate;
	let amplitudes = computeCorrelations(timeseries, test_frequencies, sample_rate);
	self.postMessage({ "timeseries": timeseries, "frequency_amplitudes": amplitudes });
};


function computeCorrelations(timeseries, test_frequencies, sample_rate)
{
    // 2pi / sample_rate converts frequency to radians per sample.
    let scale_factor = 2 * Math.PI / sample_rate;

    // Map each test frequency to its computed amplitude.
    let amplitudes = test_frequencies.map(
        function(f)
        {
            let frequency = f.frequency;

            // Initialize the accumulator for the real and imaginary components.
            let accumulator = [ 0, 0 ];

            // Loop through each time point in the timeseries.
            for (let t = 0; t < timeseries.length; t++)
            {
                // Add the contribution of the current sample to the real part.
                accumulator[0] += timeseries[t] * Math.cos(scale_factor * frequency * t);

                // Add the contribution of the current sample to the imaginary part.
                accumulator[1] += timeseries[t] * Math.sin(scale_factor * frequency * t);
            }

            // Return the complex amplitude for this frequency.
            return accumulator;
        }
    );

    // Return the array of amplitudes for each test frequency.
    return amplitudes;
}
