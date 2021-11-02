# vitals-tester
small utility to generate the vitals you want.

http://vitals-tester.vercel.app/

### General
Every metric supports categories (GOOD, POOR, NEEDS_IMPROVEMENT) which will randomly pick a value to match that category.
Or numerical values with optional random parameters. So ?lcp=1000 sets the lcp to 1000,  ?lcp=1000&random=500 sets the lcp
to some value between 500 and 1500. lcp?=GOOD sets it to a randomly picked "GOOD" value for the metric. 

type={DESKTOP|MOBILE}  set mobile or desktop thresholds when using categorical values (GOOD, POOR, NEEDS_IMPROVEMENT)
random=Number  set a random fluctuation of +/-Number



### LCP and FCP can be used together or individually
https://vitals-tester.vercel.app/?fcp=POOR

https://vitals-tester.vercel.app/?fcp=NEEDS_IMPROVEMENT

https://vitals-tester.vercel.app/?fcp=GOOD

https://vitals-tester.vercel.app/?lcp=1000&random=500

https://vitals-tester.vercel.app/?fcp=500&lcp=1000&random=500

https://vitals-tester.vercel.app/?fcp=GOOD&lcp=POOR

### TBT can be used only standalone but with categories or values
https://vitals-tester.vercel.app/?tbt=POOR&type=MOBILE

https://vitals-tester.vercel.app/?tbt=500&random=100

### CLS also can only be used alone 
https://vitals-tester.vercel.app/?cls=0.15&random=0.01

https://vitals-tester.vercel.app/?cls=GOOD


