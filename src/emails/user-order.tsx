import type { UserOrderData, OrderData } from "@types"
import {
  Html,
  Head,
  Body,
  Preview,
  Container,
  Section,
  Row,
  Column,
  Text,
  Img,
  Hr,
  Link,
  Tailwind
} from "@react-email/components"
import { formatDateTime, formatPrice, formatPhoneNumber } from "@lib/format"
import { resolveImageURL } from "@lib/cloudinary"

const BASE_URL = "https://www.dunor.boutique"
export function UserOrderEmail({ user, order }: { user: UserOrderData; order: OrderData }) {
  const shortenId = (orderId: string) => orderId.split("-")[0]
  const currentYear = new Date().getFullYear()

  return (
    <Html lang="es">
      <Head />
      <Preview>Orden de Reserva</Preview>
      <Body
        className="bg-white"
        style={{
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
        }}
      >
        <Tailwind>
          <Container className="my-10 mx-auto pt-5 pb-12 max-w-2xl">
            <Section>
              <Row>
                <Column>
                  <Img
                    src={`${BASE_URL}/icons/dunor.svg`}
                    width="200"
                    height="50"
                    alt="Dunor Logo"
                  />
                </Column>
                <Column align="right" className="table-cell">
                  <Text className="text-3xl text-neutral-500">Recibo</Text>
                </Column>
              </Row>
            </Section>
            <Section>
              <Text className="my-8 text-neutral-800 text-lg text-center">
                La reserva de tus productos ha sido realizada con éxito.
              </Text>
            </Section>
            <Section className="bg-neutral-100 border-spacing-0 border-collapse rounded-sm text-sm">
              <Row className="h-12">
                <Column colSpan={2}>
                  <Section>
                    <Row>
                      <Column className="pl-5 py-2 h-11 border-b-2 border-x border-white text-neutral-600">
                        <Text className="m-0 p-0 text-sm leading-normal font-medium text-neutral-700">
                          Correo
                        </Text>
                        <Link
                          href={`${BASE_URL}/account`}
                          className="m-0 p-0 text-blue-600 text-sm leading-normal underline"
                        >
                          {user.email}
                        </Link>
                      </Column>
                    </Row>
                    <Row>
                      <Column className="pl-5 py-2 h-11 border-b-2 border-x border-white text-neutral-600">
                        <Text className="m-0 p-0 text-sm leading-normal font-medium text-neutral-700">
                          Fecha orden
                        </Text>
                        <Text className="m-0 p-0 text-sm leading-normal">
                          {formatDateTime(order.created_at)}
                        </Text>
                      </Column>
                    </Row>
                    <Row>
                      <Column className="pl-5 py-2 h-11 border-r-2 border-white text-neutral-600">
                        <Text className="m-0 p-0 text-sm leading-normal font-medium text-neutral-700">
                          Orden N°
                        </Text>
                        <Link
                          href={`${BASE_URL}/orders/${order.id}`}
                          className="m-0 p-0 text-blue-600 text-sm leading-normal underline"
                        >
                          {shortenId(order.id)}
                        </Link>
                      </Column>
                      <Column className="pl-5 py-2 h-11 border-x border-white text-neutral-600">
                        <Text className="m-0 p-0 text-sm leading-normal font-medium text-neutral-700">
                          Teléfono
                        </Text>
                        <Text className="m-0 p-0 text-sm leading-normal">
                          {formatPhoneNumber(user.phone)}
                        </Text>
                      </Column>
                    </Row>
                  </Section>
                </Column>
                <Column
                  className="pl-5 py-2 h-11 border-x border-white text-neutral-600"
                  colSpan={2}
                >
                  <Text className="m-0 p-0 text-sm leading-normal font-medium text-neutral-700">
                    Reservado a
                  </Text>
                  <Text className="m-0 p-0 text-sm leading-normal">{user.fullName}</Text>
                  <Text className="m-0 p-0 text-sm leading-normal">{user.address}</Text>
                </Column>
              </Row>
            </Section>
            <Section className="mt-7 h-6">
              <Text className="py-2 pl-5 bg-neutral-100 text-base font-medium">
                Resumen de Orden
              </Text>
            </Section>
            <Section>
              {order.products.map(product => (
                <Row className="mb-4">
                  <Column style={{ width: "64px" }}>
                    <Img
                      src={`${resolveImageURL({ src: product.image_url, width: 64, height: 64 })}`}
                      width="64"
                      height="64"
                      alt={product.name}
                      className="mt-4 ml-5 rounded-md"
                    />
                  </Column>
                  <Column className="pl-10">
                    <Text className="m-0 mt-3 text-lg font-medium">{product.name}</Text>
                    <Text className="m-0 text-neutral-500">Cantidad: {product.quantity}</Text>
                  </Column>

                  <Column className="pr-5 w-32" align="right">
                    <Text className="text-base font-medium">Precio Renta: {formatPrice(product.price)}</Text>
                  </Column>
                </Row>
              ))}
            </Section>
            <Hr className="mt-10" />
            <Section align="right">
              <Row>
                <Column className="table-cell" align="right">
                  <Text className="m-0 pr-5 text-base uppercase">Total</Text>
                </Column>
                <Column className="h-12 border-l"></Column>
                <Column className="px-4 w-28">
                  <Text className="text-base text-right font-semibold">
                    {formatPrice(order.total)}
                  </Text>
                </Column>
              </Row>
            </Section>
            <Hr className="mb-5" />
            <Text className="text-sm text-center text-neutral-500">
              Si tienes alguna pregunta sobre tu orden, puedes contactar a nuestro equipo de soporte
              en <Link href="mailto:boutiquedunor@gmail.com">boutiquedunor@gmail.com</Link> o
              escribirnos a nuestro <Link href="https://wa.me/573216105383">Whatsapp</Link>.
            </Text>
            <Section>
              <Row>
                <Column className="block mt-10" align="center">
                  <Img
                    src={`${BASE_URL}/icons/shield.svg`}
                    width="80"
                    height="80"
                    alt="Dunor Shield Logo"
                  />
                </Column>
              </Row>
            </Section>
            <Text className="mt-5 text-center text-sm">
              <Link href={`${BASE_URL}/account`} className="mr-4">Cuenta</Link>
              <Link href={`${BASE_URL}/services`} className="mr-4">Servicios</Link>
              <Link href={`${BASE_URL}/contact`}>Contacto</Link>
            </Text>
            <Text className="text-center text-sm text-neutral-500">
              Copyright © {currentYear} Dunor Boutique. Todos los derechos reservados.
            </Text>
          </Container>
        </Tailwind>
      </Body>
    </Html>
  )
}
