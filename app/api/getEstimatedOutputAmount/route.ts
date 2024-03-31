export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const coinType = searchParams.get('coinType')
  const action = searchParams.get('action')
  const inputAmount = searchParams.get('inputAmount')
  if (!inputAmount) {
    return Response.json(
      {
        success: false,
        message: 'Input amount is required'
      },
      {
        status: 400
      }
    )
  }

  return Response.json(
    {
      success: true,
      message: '',
      data: {
        estimatedOutputAmount: inputAmount
      }
    },
    {
      status: 200
    }
  )
}
