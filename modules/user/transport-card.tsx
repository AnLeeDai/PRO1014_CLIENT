import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Tooltip,
  Autocomplete,
  AutocompleteItem,
  Tab,
  Tabs,
} from "@heroui/react";
import { MapPin } from "lucide-react";

interface ITransportCardProps {
  deliveryMethod: "delivery" | "pickup";
  setDeliveryMethod: (method: "delivery" | "pickup") => void;
  addressQuery: string;
  setAddressQuery: (query: string) => void;
  addressSuggestions: { key: string; label: string }[];
  isSearchingAddress: boolean;
  handleSelectAddress: (key: string) => void;
  isGettingCurrentLocation: boolean;
  handleUseCurrentLocation: () => void;
}

export default function TransportCard(props: ITransportCardProps) {
  const {
    deliveryMethod,
    setDeliveryMethod,
    addressQuery,
    setAddressQuery,
    addressSuggestions,
    isSearchingAddress,
    handleSelectAddress,
    isGettingCurrentLocation,
    handleUseCurrentLocation,
  } = props;

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Phương thức giao hàng</h2>
      </CardHeader>

      <CardBody>
        <Tabs
          aria-label="Phương thức giao hàng"
          selectedKey={deliveryMethod}
          variant="bordered"
          onSelectionChange={(key) =>
            setDeliveryMethod(key as "delivery" | "pickup")
          }
        >
          <Tab key="delivery" title="Giao hàng">
            <Autocomplete
              className="mb-4"
              inputValue={addressQuery}
              isLoading={isSearchingAddress}
              label="Địa chỉ giao hàng của bạn"
              startContent={<MapPin className="text-muted-foreground" />}
              onInputChange={(value) => setAddressQuery(value)}
              onSelectionChange={(key) => {
                if (key !== null) {
                  handleSelectAddress(key as string);
                }
              }}
            >
              {addressSuggestions.map((item) => (
                <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
              ))}
            </Autocomplete>

            <div className="space-y-4 text-base">
              <Tooltip content="Vị trí chỉ mang tính chất tương đối, có thể không chính xác">
                <Chip
                  className="cursor-pointer"
                  color="success"
                  isDisabled={isGettingCurrentLocation}
                  variant="faded"
                  onClick={handleUseCurrentLocation}
                >
                  {isGettingCurrentLocation
                    ? "Đang lấy vị trí..."
                    : "📍 Dùng vị trí hiện tại của bạn"}
                </Chip>
              </Tooltip>
            </div>
          </Tab>
          <Tab key="pickup" title="Tự đến lấy">
            <p className="text-base italic">
              Tự đến lấy hàng tại cửa hàng sẽ giúp bạn{" "}
              <strong>không mất phí vận chuyển</strong>.
            </p>
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
}
