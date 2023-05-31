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
	// 2pi * frequency gives the appropriate period to sine.
	// timeseries index / sample_rate gives the appropriate time coordinate.
	let scale_factor = 2 * Math.PI / sample_rate;
	let amplitudes = test_frequencies.map
	(
		function(f)
		{
			let frequency = f.frequency;

			// Represent a complex number as a length-2 array [ real, imaginary ].
			let accumulator = [ 0, 0 ];
			for (let t = 0; t < timeseries.length; t++)
			{
				accumulator[0] += timeseries[t] * Math.cos(scale_factor * frequency * t);
				accumulator[1] += timeseries[t] * Math.sin(scale_factor * frequency * t);
			}

			return accumulator;
		}
	);

	return amplitudes;
}
